import React from 'react';

import logo from '../../assets/reddit_logo.svg';
import { Search } from '../search/Search';

export const Header = () => {
    return (
        <header>
            <section>
                <img src={logo} alt='logo' />
                <h1>Reddit<span>Minimal</span></h1>
            </section>
            <Search />
        </header>
    )
}