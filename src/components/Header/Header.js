import './header.scss'
import React, { useEffect, useMemo, useState } from 'react';
import { loginApi } from '../API/loginApi';
import { useLocation, useNavigate } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import BallotIcon from '@mui/icons-material/Ballot';

export default function Header({token, setToken}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [login, setlogin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const user = useMemo(() => JSON.parse(localStorage.getItem('user')), [login])

    const handleLogout = () => {
        setlogin(false)
        localStorage.removeItem('token')
        setToken(null)
        localStorage.removeItem('user')
    }

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setToken(localStorage.getItem('token'))
            loginApi.checkToken()  
            setlogin(true)
        }
    }, [location.state?.data])
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <div className="header">
                <p>Вело Патруль</p>
                <div className="loginBox">
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 45, height: 45 }}>M</Avatar>
                        </IconButton>
                    </Tooltip>
                    
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                            },
                            '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            },
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        {login === false
                            &&
                            <MenuItem style={{ width: '150px' }} onClick={() => {
                                navigate('login')
                            }}>
                                <p>Login</p>
                            </MenuItem>
                        
                        }
                        {login &&
                                <div>
                                        <MenuItem onClick={() => {
                                            navigate(`officers/${user.id}`,{ state: { message: "User" }})
                                        }}>
                                        <Avatar /> Профиль
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem onClick={() => {
                                            navigate('registration')
                                        }}>
                                        <ListItemIcon>
                                            <PersonAdd fontSize="small" />
                                        </ListItemIcon>
                                            Добавить сотрудника
                                        </MenuItem>
                                        <MenuItem onClick={() => {
                                            navigate('officers',
                                                location.state?.message === 'Reload officers'
                                                &&
                                                { state: { message: "Reload" } }
                                            )
                                        }}>
                                        <ListItemIcon >
                                            <BallotIcon fontSize="small" />
                                        </ListItemIcon>
                                            Список сотрудников
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Выход                          
                                        </MenuItem>
                                </div>
                        }
                        </Menu>
                        
                </div>
            </div>
        </>
    )
}