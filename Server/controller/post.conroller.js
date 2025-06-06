const postModel = require("../model/post.model");


const postcontroller = {
    createPost : async(req,res) => {
        const { title, content } = req.body;
        const userId = req.user._id;

        if (!title || !content) {
            return res.status(400).json({ message: "fill the title and content filed." });
        }

        try {
            const post = await postModel.create({ title, content, userId });
            res.status(201).json({ message: "Post created", post });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = postcontroller;