import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchResults } from '../../features/fetchArticles/fetchArticlesSlice';

const inputStyles = {
    width: '25%',
    height: 30,
    borderRadius: 5,
    outline: 'none',
    backgroundColor: 'rgb(233, 233, 233)',
    border: '1px solid gray',
    paddingLeft: 20
}
const buttonStyles = {
    width: '10%',
    height: 30,
    borderRadius: 5,
    backgroundColor: 'rgb(33, 33, 33)',
    border: 'none',
    cursor: 'pointer',
    marginLeft: 5,
    color: '#fff'
}

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