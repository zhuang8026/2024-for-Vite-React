import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Home = () => {
    return (
        <div className={cx('home')}>
            <div className={cx('block')}>
                <h3>用電追蹤</h3>
                <div className={cx('target-box')}>設定目標</div>
                <div className={cx('setting-review')}>本月累積</div>
            </div>
        </div>
    );
};

export default Home;
