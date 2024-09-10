import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Header = () => {
    return (
        <div className={cx('header')}>
            <h1>header</h1>
        </div>
    );
};

export default Header;
