import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// config
import routes from '@/router/routes';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Header = () => {
    const { pathname } = useLocation(); // Move useLocation here

    const [head, setHead] = useState('');

    useEffect(() => {
        const name = routes.find(item => item.path === pathname)?.title;
        setHead(name);
    }, [pathname]);
    return (
        <div className={cx('header')}>
            <h1>{head}</h1>
        </div>
    );
};

export default Header;
