const express = require('express');
const router = express.Router();
const Comment = require("../models/comment");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");
const Tag = require("../models/tags");
const isAuthenticated = require("./isAuthenticated");


/*
Method that returns all tags and their IDs
 */
router.get('/tags', async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting tags' });
    }
});

/*
Method that gets tag with teg count
 */
router.get('/tags-with-count', async (req, res) => {
    try {

        const allTags = await Tag.find({});
        const tagMap = new Map(allTags.map(tag => [tag.name.toLowerCase(), { _id: tag._id, name: tag.name.toLowerCase(), count: 0 }]));

        // Get counts
        const tagCounts = await Question.aggregate([
            { $unwind: '$tags' },
            { $group: { _id: '$tags', count: { $sum: 1 } } },
            { $project: { _id: 0, tagId: '$_id', count: 1 } }
        ]);

        // Update the counts
        for (const tagCount of tagCounts) {
            const tag = await Tag.findById(tagCount.tagId);
            if (tag && tagMap.has(tag.name.toLowerCase())) {
                tagMap.get(tag.name.toLowerCase()).count += tagCount.count;
            }
        }

        const tagsWithCount = Array.from(tagMap.values());

        // Sort
        tagsWithCount.sort((a, b) => a.name.localeCompare(b.name));

        res.json(tagsWithCount);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting tags with counts' });
    }
});


/*
Method to edit a tag name by ID
*/
router.put('/tags/:tagId', isAuthenticated,  async (req, res) => {
    const { tagId } = req.params;
    const userId = req.session.userId;
    const { name } = req.body;

    try {

        const user = await User.findOne({ id: userId });
        console.log("userId: ", userId)
        console.log("user.username: ", user.username)

        // Check if the tag is being used in questions by other users
        const questionUsingTag = await Question.findOne({ tags: tagId, asked_by: { $ne: user.username } });
        console.log("questionUsingTag: ", questionUsingTag)

        if (questionUsingTag) {
            return res.status(400).json({'message': 'Cannot edit tag, it is being used in questions by other users'});
        }


        const updatedTag = await Tag.findByIdAndUpdate(tagId, { name }, { new: true });

        if (!updatedTag) {
            return res.status(404).json({'message': 'Tag not found'});
        }

        res.json({'message': 'Tag updated successfully', 'updatedTag': updatedTag});
    } catch (error) {
        res.status(500).json({'message': 'Error updating tag'});
        console.error("Error: ", error);
    }
});

/*
Method to delete a tag by ID
*/
router.delete('/tags/:tagId', isAuthenticated, async (req, res) => {
    const { tagId } = req.params;
    const userId = req.session.userId;

    try {
        const tag = await Tag.findById(tagId);

        if (!tag) {
            return res.status(404).json({'message': 'Tag not found'});
        }

        // Check if the tag is being used in questions by other users
        const questionUsingTag = await Question.findOne({ tags: tagId, asked_by: { $ne: userId } });
        if (questionUsingTag) {
            return res.status(400).json({'message': 'Cannot delete tag, it is being used in questions by other users'});
        }

        await Tag.findByIdAndDelete(tagId);

        res.json({'message': 'Tag deleted successfully'});
    } catch (error) {
        res.status(500).json({'message': 'Error deleting tag'});
        console.error("Error: ", error);
    }
});



/*
Method to get a tag by ID
*/
router.get('/tags/:tagId', async (req, res) => {
    const { tagId } = req.params;

    try {
        const tag = await Tag.findById(tagId);

        if (!tag) {
            return res.status(404).json({'message': 'Tag not found'});
        }

        res.json(tag);
    } catch (error) {
        res.status(500).json({'message': 'Error fetching tag'});
        console.error("Error: ", error);
    }
});


// /*
// Method that returns tagName for a given tag id
//  */
// app.get('/tags/tag-id/:tagId', async (req, res) => {
//     const { tagId } = req.params;
//     await get_tag_name_by_tag_id_function.get_tag_name_by_tag_id(res, tagId);
// });


module.exports = router;
