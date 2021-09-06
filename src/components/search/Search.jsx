import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchResults } from '../../features/fetchArticles/fetchArticlesSlice';
import { inputStyles, buttonStyles } from './styles';


export const Search = () => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const searchText = useRef();

    const handleSubmit = event => {
        event.preventDefault();
        if (searchText.current.value == []) return;
        setSearch(searchText.current.value);
        searchText.current.value = null;
    }

    useEffect(() => {
        dispatch(searchResults(search))
    }, [search])

    return (
        <form style={{width: '100%'}} onSubmit={handleSubmit}>
            <input id='input' style={inputStyles} type='text' placeholder='News' ref={searchText} />
            <input style={buttonStyles} type='submit' value='Search' />
        </form>
    )
}