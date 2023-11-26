const Tag = require("../models/tags");
const Question = require("../models/questions");
const elementFactory = require("../models/elementFactory");
const User = require("../models/users");

async function questionCreate(title, text, tags, answers, asked_by, ask_date_time, views) {
    try {
        const qstn = elementFactory.create_element('Question', {
            title: title,
            text: text,
            tags: tags,
            asked_by: asked_by,
            answers: answers,
            ask_date_time: ask_date_time,
            views: views,
        });

        await qstn.save();
        return qstn;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function tagCreate(name, userId) {
    try {
        let tag = await Tag.findOne({ name: name.toLowerCase() });

        if (!tag) {
            // Create a new tag if it doesn't exist
            tag = elementFactory.create_element('Tag', { name: name.toLowerCase() });
            await tag.save();

            // Add this tag to the user's posted_tags array to accomodate requirement
            await User.findByIdAndUpdate(userId, { $addToSet: { posted_tags: tag._id } });
        }

        return tag;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

exports.post_question = async function (res, title, text, tags, asked_by) {
    const tagNames = tags.split(/\s+/).map(tagName => tagName.trim());
    const normalizedTags = tagNames.map(tag => tag.toLowerCase());

    try {
        const tagIds = [];
        const user = await User.findOne({ username: asked_by }); // Assuming asked_by is the username

        for (const tagText of normalizedTags) {
            let existingTag = await Tag.findOne({ name: tagText });
            if (!existingTag) {
                existingTag = await tagCreate(tagText, user._id);
            }
            tagIds.push(existingTag._id);
        }

        const newQuestion = await questionCreate(title, text, tagIds, [], asked_by, new Date(), 0);
        res.status(201).json(newQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding new question' });
    }
}