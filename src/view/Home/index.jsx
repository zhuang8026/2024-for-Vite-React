import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import './style_module.scss';

const Home = () => {
    return (
        <div className="home">
            <h1>Home Page</h1>
        </div>
    );
};

export default Home;
