const express = require('express')
const blogModel = require('../models/blogModel')
const userModel = require('../models/userModel')
const mongoose = require('mongoose')

//router object 
const router = express.Router()

//routes
//GET || all blogs
exports.getAllBlogController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user');

        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "No blogs found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "All blogs List",
            BlogCount: blogs.length,
            blogs,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while Getting blog",
            error
        })

    }

}
// create blog
exports.createBlogController = async (req, res) => {
    try {

        const { title, description, image, user } = req.body;
        //validation
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields"
            })
        }

        const existingUser = await userModel.findById(user);
        //validation
        if (!existingUser) {
            return res.status(400).send({
                success: false,
                message: "User not found"
            })
        }



        const newBlog = new blogModel({ title, description, image, user })

        const session = await mongoose.startSession();
        session.startTransaction()
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog)
        await existingUser.save({ session });
        await session.commitTransaction()

        await newBlog.save()
        return res.status(201).send({
            success: true,
            message: "Blog created successfully",
            newBlog
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error while creating blog",
            error
        })

    }

}

// update blog
exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body
        const blog = await blogModel.findByIdAndUpdate(
            id, { ...req.body }, { new: true });
        return res.status(200).send({
            success: true,
            message: "Blog updated successfully",
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while Getting blog",
            error
        })

    }

}

//single blog details
exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found",
            })
        }

        return res.status(200).send({
            success: true,
            message: "Blog details fetched successfully",
            blog
        })

    } catch (error) {
        console.log(error);
        return res.status(404).send({
            success: false,
            message: "Blog not found",
            error
        })

    }

}

// delete-blog
exports.deleteBlogController = async (req, res) => {
    try {

        const blog = await blogModel
            // findOneAndDelete(req.params.id).populate("user")
            .findByIdAndDelete(req.params.id)
        await blog.user.blogs.pull(blog);

        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: "Blog deleted successfully"
        })

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found",
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error while deleting blog",
            error
        })
    }
}

//GET USER BLOG

exports.userBlogController = async (req, res) => {
    try {

        const userBlog = await userModel.findById(req.params.id).populate("blogs");
        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "Blogs not found with this id",
            })
        }
        return res.status(200).send({
            success: true,
            message: "User Blogs",
            userBlog
        });

    } catch (error) {
        console.log(error);
        return res.status(404).send({
            success: false,
            message: "Error while fetching user blogs",
            error
        })
    }
};
