import React, { useState } from 'react'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'


const CreateBlog = () => {

    const id = localStorage.getItem('userId');
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        image: "",
    });

    //input change
    const handleChange = (event) => {
        setInputs(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        })

        )
    }

    //form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/api/v1/blog/create-blog", {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id,
            });
            if (data?.success) {
                toast.success("Story Added....!")
                navigate('/my-blogs')
            }

        } catch (error) {
            console.log(error)
        }

    };
    return (
        <>
            <form onSubmit={handleSubmit} style={{ marginTop: "10%" }}>

                <Box width={'40%'} marginTop="30px" border={3} borderRadius={10} padding={3} margin="auto" boxShadow={'10px 10px 20px #ccc'} display="flex" flexDirection={'column'}>
                    <Typography variant='h3' textAlign={'center'} fontWeight="bold" padding={2} color='black'>
                        Create a Story
                    </Typography>


                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
                        Title
                    </InputLabel>
                    <TextField name='title' value={inputs.title} onChange={handleChange} margin='normal' variant='outlined' required></TextField>


                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
                        Description
                    </InputLabel>
                    <TextField name='description' value={inputs.description} onChange={handleChange} margin='normal' variant='outlined' required></TextField>


                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
                        Image URL
                    </InputLabel>
                    <TextField name='image' value={inputs.image} onChange={handleChange} margin='normal' variant='outlined'></TextField>

                    <Button type='submit' sx={{ mb: 1, mt: 2, }} width={"10%"} color='primary' variant='contained'>Create</Button>
                </Box>

            </form>
        </>
    )
}

export default CreateBlog