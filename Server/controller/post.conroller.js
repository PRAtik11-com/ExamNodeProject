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
    },
    getPosts :async (req, res) => {
        const userId = req.user._id;

        try {
            const posts = await postModel.find({ userId });
            res.status(200).json({ posts });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updatePosts : async (req, res) => {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user._id;

        try {
            const post = await postModel.findById(id);

            if (!post) {
            return res.status(404).json({ message: "Post not found" });
            }

            if (post.userId !== userId) {
            return res.status(403).json({ message: "Unauthorized to update this post" });
            }

            const updatedPost = await postModel.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
            );

            res.status(200).json({ message: "Post updated", post: updatedPost });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deletePosts :async (req, res) => {
        const { id } = req.params;
        const userId = req.user._id;

        try {
            const post = await postModel.findById(id);

            if (!post) {
            return res.status(404).json({ message: "Post not found" });
            }

            if (post.userId !== userId) {
            return res.status(403).json({ message: "Unauthorized to delete this post" });
            }

            await postModel.findByIdAndDelete(id);

            res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = postcontroller;