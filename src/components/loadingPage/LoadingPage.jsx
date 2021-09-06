import React from 'react';
import logo from '../../assets/reddit_logo.svg';
import { LoadingSpinner } from '../../utils/LoadingSpinner';
import { screenStyles, canvasStyle, headerLoadingStyles } from './styles';

export const LoadingPage = () => {
    return (
        <div style={screenStyles}>
            <canvas className='canvas-selector' style={canvasStyle}></canvas>
            <header style={headerLoadingStyles}>
                <img src={logo} style={{width: '13vw', filter: 'invert(1)'}} alt='loading-logo' />
                <h1 style={{paddingLeft: 10, fontSize: 45, filter: 'invert(1)'}}>Reddit<span className='app-color'>Minimal</span></h1>
            </header>
            <LoadingSpinner marginTop='10vh' />
        </div>
    )
}