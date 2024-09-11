import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import CircleNotificationsTwoToneIcon from '@mui/icons-material/CircleNotificationsTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

import taiwan from '@/assets/images/taiwan.svg';
import english from '@/assets/images/english.svg';
// config
import routes from '@/router/routes';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Header = () => {
    const { pathname } = useLocation(); // Move useLocation here

    const [visible, setVisible] = useState(false);
    const [head, setHead] = useState({
        main: '',
        child: ''
    });

    useEffect(() => {
        const pathObj = routes.find(item => item.path === pathname);
        setHead({
            main: pathObj.main,
            child: pathObj.title
        });
    }, [pathname]);
    return (
        <div className={cx('header')}>
            <div className={cx('title')}>
                <p>
                    {head.main} / {head.child}
                </p>
                {head.child}
            </div>
            <div className={cx('setting')}>
                <div className={cx('button', 'language')}>
                    <img alt="" src={taiwan} onClick={() => setVisible(!visible)} />
                    {visible && (
                        <ul className={cx('language_list')}>
                            <li onClick={() => setVisible(!visible)}>
                                <img alt="" src={english} />
                                Enlish
                            </li>
                            <li>
                                <img alt="" src={taiwan} />
                                Taiwan
                            </li>
                        </ul>
                    )}
                </div>
                <div className={cx('button')}>
                    <AccountCircleTwoToneIcon />
                </div>
                <div className={cx('button')}>
                    <CircleNotificationsTwoToneIcon />
                </div>
            </div>
        </div>
    );
};

export default Header;
