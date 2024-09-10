import React, { useState, Suspense, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// mui
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// icon
// import logo from '@/assets/images/icon-logo.svg';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Menu = ({ menuList }) => {
    const navigate = useNavigate(); // Properly define navigate here
    const location = useLocation(); // This gives the current location

    const [currentPath, setCurrentPath] = useState('/main');

    const clickMenu = (key, path) => {
        console.log(key, path);
        setCurrentPath(path);
        navigate({
            ...location,
            pathname: `${path}`
        });
    };
    return (
        <nav className={cx('nav-menu')}>
            <div className={cx('menu', 'menu-root')}>
                {/* company logo */}
                <div className={cx('logo')}>
                    {/* <img src={logo} alt="logo" /> */}
                    logo
                </div>
                <hr />

                {/* menu list */}
                <div className={cx('menu-body')}>
                    <ul>
                        {menuList.map((item, index) => (
                            <li key={index}>
                                <p className={cx('menu-name')}>{item.main}</p>
                                {item.children.map((item, idx) => (
                                    <div
                                        className={cx('menu-link', currentPath === item.path && 'menu_active')}
                                        onClick={() => clickMenu(index, item.path)}
                                        key={idx}
                                    >
                                        <DownloadingOutlinedIcon />
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
                <hr />

                {/* user control */}
                <div className={cx('menu-user')}>
                    <div className={cx('user-avatar')}>
                        <div className={cx('avatar')}></div>
                    </div>
                    <div className={cx('user')}>
                        <div className={cx('name')}>William.Chuang</div>
                        <div className={cx('logout')} onClick={() => navigate('/login')}>
                            <span>Logout</span>
                            <ExitToAppIcon />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Menu;
