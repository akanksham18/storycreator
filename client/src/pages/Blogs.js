import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCards from '../components/BlogCards';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    // Fetch all blogs
    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get('/api/v1/blog/all-blog');
            if (data?.success) {
                setBlogs(data?.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <div style={{ marginTop: "10%" }}>
            {blogs && blogs.length > 0 ? (
                blogs.map((blog) => (
                    blog && blog._id && blog.user && ( // Ensure blog, _id, and user exist
                        <BlogCards
                            key={blog?._id}
                            id={blog?._id}
                            isUser={localStorage.getItem("userId") === blog?.user._id}
                            title={blog?.title}
                            description={blog?.description}
                            image={blog?.image}
                            username={blog?.user.username}
                            time={blog.createdAt}
                        />
                    )
                ))
            ) : (


                <p style={{ fontSize: '1.5rem', color: 'black' }}>No stories available</p>
            )}
        </div>
    );
};

export default Blogs;
