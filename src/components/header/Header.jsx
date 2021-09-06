import React from 'react';

import logo from '../../assets/reddit_logo.svg';
import { Search } from '../search/Search';
import { headerStyle, logoStyle } from './styles.js';

export const Header = () => {

    return (
        <header style={headerStyle}>
            <section style={logoStyle}>
                <img src={logo} style={{width: '10%'}} alt='logo' />
                <h1 style={{paddingLeft: 10}}>Reddit<span className='app-color'>Minimal</span></h1>
            </section>
            <Search />
        </header>
    )
}