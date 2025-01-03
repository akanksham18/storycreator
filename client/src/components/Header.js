import React, { useState } from 'react'
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../redux/store'
import toast from 'react-hot-toast'

const Header = () => {
    //global state
    let isLogin = useSelector((state) => state.isLogin);
    isLogin = isLogin || localStorage.getItem("userId ")
    const dispatch = useDispatch()
    const navigate = useNavigate();
    //state
    const [value, setValue] = useState();

    const handleLogout = () => {
        try {
            dispatch(authActions.logout())
            toast.success("Logged out successfully")
            navigate('/login')
            localStorage.clear();

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <AppBar position='fixed'>
                <Toolbar>
                    <Typography variant='h4'>
                        STORY APP
                    </Typography>

                    {isLogin && (

                        <Box display={'flex'} marginLeft="auto" marginRight={'auto'}>
                            <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(value)}>
                                <Tab label="Stories" LinkComponent={Link} to="/blogs" />
                                <Tab label="My Story" LinkComponent={Link} to="/my-blogs" />
                                <Tab label="Create Story" LinkComponent={Link} to="/create-blog" />
                            </Tabs>
                        </Box>
                    )}

                    <Box display={'flex'} marginLeft="auto">
                        {!isLogin && (
                            <>
                                <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/login">Login</Button>
                                <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/register">Register</Button>
                            </>
                        )}

                        {isLogin && (
                            <Button onClick={handleLogout} sx={{ margin: 1, color: 'white' }}>Logout</Button>
                        )}
                    </Box>

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header
