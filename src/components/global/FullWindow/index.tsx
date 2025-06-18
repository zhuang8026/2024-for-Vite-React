import React, { createContext, useState, useContext, ReactNode, FC } from 'react';
import classes from './styles.module.scss';

// 第一步：先聲明 Type 類型
type AnimateObject = {
    component: ReactNode;
};

type FullWindowAnimateContextType = {
    animateObj: AnimateObject | null;
    openAnimate: (obj: AnimateObject) => void;
    closeAnimate: () => void;
};

// Context
const FullWindowAnimateContext = createContext<FullWindowAnimateContextType | undefined>(undefined);

// Provider Component using Hooks
interface FullWindowAnimateProviderProps {
    children: ReactNode;
}

export const FullWindowAnimateProvider: FC<FullWindowAnimateProviderProps> = ({ children }) => {
    const [animateObj, setAnimateObj] = useState<AnimateObject | null>(null);

    const openAnimate = (obj: AnimateObject) => {
        setAnimateObj(obj);
    };

    const closeAnimate = () => {
        setAnimateObj(null);
    };

    const fullWindowData: FullWindowAnimateContextType = {
        animateObj,
        openAnimate,
        closeAnimate
    };

    return <FullWindowAnimateContext.Provider value={fullWindowData}>{children}</FullWindowAnimateContext.Provider>;
};

// Custom Hook for accessing the context
export const useFullWindowAnimate = (): FullWindowAnimateContextType => {
    const context = useContext(FullWindowAnimateContext);
    if (!context) {
        throw new Error('useFullWindowAnimate must be used within a FullWindowAnimateProvider');
    }
    return context;
};

// Pop Window Component
export const FullPopWindow: FC = () => {
    const { animateObj } = useFullWindowAnimate();

    if (animateObj) {
        return <div className={classes.popAnimateContainer}>{animateObj.component}</div>;
    }

    return null;
};
