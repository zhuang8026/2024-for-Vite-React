import React, { useState, Suspense, useEffect, useContext, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// mui
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';

// config
import routes from '@/router/routes';
import globalRoutes from '@/router/global_routes';

// components
import NoMatch from '@/components/global/NoMatch';
import Menu from '@/components/global/Menu';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';

// global
import { FullWindowAnimateProvider, FullPopWindow, useFullWindowAnimate } from '@/components/global/FullWindow';

import '@/assets/scss/_all.scss';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

function App() {
    const [layouts, setLayouts] = useState([]);
    const [auth, setAuth] = useState(true);
    const [menuList, setMenuList] = useState([
        {
            main: 'Dashboard',
            children: [
                {
                    name: 'Overall information',
                    path: '/main',
                    icon: <DownloadingOutlinedIcon />
                },
                {
                    name: 'Sensor Time Log',
                    path: '/user/account',
                    icon: <DownloadingOutlinedIcon />
                }
            ]
        },
        {
            main: 'Equipment Management',
            children: [
                {
                    name: 'Equipment List',
                    path: '/pageA',
                    icon: <DownloadingOutlinedIcon />
                },
                {
                    name: 'Gateway Management',
                    path: '/pageB',
                    icon: <DownloadingOutlinedIcon />
                }
            ]
        }
    ]);

    const { pathname } = useLocation(); // Move useLocation here

    // menu (layout & url)
    const getLayouts = () => {
        console.log('畫面區塊異動中', auth, pathname);
        if (auth) {
            const layoutPath = location.pathname.split('/')[1].toUpperCase();
            const matchedRoute = routes.find(route => route.path.split('/')[1].toUpperCase() === layoutPath);

            if (matchedRoute) {
                setLayouts(matchedRoute.layouts); // 更新 layouts
            } else {
                setLayouts([]); // 没有匹配的 route 时，清空 layouts
            }
        } else {
            // no auth (token error)
            setLayouts([]);
        }
    };

    useEffect(() => {
        getLayouts();
    }, [auth, pathname]); // pathname 变化时也调用 getLayouts

    return (
        <div id={cx('app')}>
            {/* menu */}
            {layouts.indexOf('menu') >= 0 && (
                <Suspense fallback={<></>}>
                    <Menu menuList={menuList} />
                </Suspense>
            )}
            <div className={cx(layouts.indexOf('menu') >= 0 ? 'main' : 'full')}>
                {/* header */}
                {layouts.indexOf('header') >= 0 ? (
                    <Suspense fallback={<></>}>
                        <Header />
                    </Suspense>
                ) : null}

                {/* main */}
                <Suspense fallback={<></>}>
                    <Routes>
                        {/* <Navigate> 不能直接放置在 <Routes> 的頂層下，它必須作為一個 <Route> 的 element 來使用。 */}
                        <Route path="/" element={<Navigate to="/main" replace />} />

                        {/* global routes */}
                        {globalRoutes.map((route, key) => {
                            return (
                                <Route
                                    key={`route_${key}`}
                                    exact={route.exact}
                                    path={route.path}
                                    element={<route.component routeData={route} />}
                                    sensitive
                                />
                            );
                        })}

                        {/* private routes */}
                        {routes.map((route, key) => {
                            return (
                                <Route
                                    key={`route_${key}`}
                                    exact={route.exact}
                                    path={route.path}
                                    element={<route.component routeData={route} />}
                                    sensitive
                                />
                            );
                        })}
                        <Route path="*" element={<NoMatch />} />
                    </Routes>
                </Suspense>

                {/* footer */}
                {layouts.indexOf('footer') >= 0 ? (
                    <Suspense fallback={<></>}>
                        <Footer />
                    </Suspense>
                ) : null}
            </div>
        </div>
    );
}

function AppWrapper() {
    return (
        <BrowserRouter>
            <FullWindowAnimateProvider>
                <App />
                <FullPopWindow />
            </FullWindowAnimateProvider>
        </BrowserRouter>
    );
}

export default AppWrapper;
