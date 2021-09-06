import React from 'react';

import logo from '../../assets/reddit_logo.svg';
import { Search } from '../search/Search';

const headerStyle = {
    padding: '15px 0'
}

const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10vh'
}

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