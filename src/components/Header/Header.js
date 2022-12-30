import './header.scss'
import React, { useEffect, useMemo, useState } from 'react';
import Login from './components/Login';
import { loginApi } from '../API/loginApi';
import OfficerList from './components/OfficerList';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import Registration from './components/Registration';
import BallotIcon from '@mui/icons-material/Ballot';




export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    //const [visable, setVisable] = useState(false)
    const [login, setlogin] = useState(false)
    const [visableLogin, setVisableLogin] = useState(false)
    const [visableRegistration, setVisableRegistration] = useState(false)
    const [visableList, setVisableList] = useState(false)

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setlogin(false)
        localStorage.removeItem('token')
        localStorage.removeItem('officerID')
    }


    useEffect( () => {
        if (localStorage.getItem('token') !== null) {
            loginApi.checkToken()  
            setlogin(true)
        }
    },[visableLogin])

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
                            <MenuItem style={{ width: '150px' }} onClick={() => setVisableLogin(true)}>
                                <p>Login</p>
                            </MenuItem>
                        
                        }
                        {login &&
                                <div>
                                    <MenuItem>
                                        <Avatar /> Профиль
                                        </MenuItem>
                                        <Divider />
                                    <MenuItem onClick={() => setVisableRegistration(true)}>
                                        <ListItemIcon>
                                            <PersonAdd fontSize="small" />
                                        </ListItemIcon>
                                        Добавить сотрудника
                                    </MenuItem>
                                    <MenuItem onClick={() => setVisableList(true)}>
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
            {visableLogin && <Login setVisableLogin={setVisableLogin} />}
            {visableRegistration && <Registration setVisableRegistration={setVisableRegistration} />}
            {visableList && <OfficerList setVisableList={setVisableList} />}
        </>
    )
}