import React from 'react';
import logo from '../../assets/reddit_logo.svg';
import { LoadingSpinner } from '../../utils/LoadingSpinner';

const screenStyles = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgb(238, 238, 238)',
    position: 'absolute',
    zIndex: '100',
    top: '0',
    left: '0',
    justifyContent: 'center',
    alignItems: 'center'
}

const headerLoadingStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: 'black',
    boxShadow: 'none',
    flexDirection: 'column',
    opacity: '0.9',
    width: '100%',
    maxHeight: '100%',
    padding: 40
}

const canvasStyle = {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    zIndex: '-1'
}


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