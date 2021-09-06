import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectIsLoading as selectArticlesIsLoading, 
    selectFetchError as selectArticlesFetchError,
    selectArticles,
    selectSearchedArticles,
    selectIsFiltered,
    fetchArticles
} from '../../features/fetchArticles/fetchArticlesSlice';
import {
    selectIsLoading as selectSubredditsIsLoading,
    selectSubReddits,
    selectFetchError as selectSubredditsFetchError,
    fetchSubreddits
} from '../../features/fetchSubreddits/fetchSubredditsSlice';
import { Article } from '../article/Article';
import { v4 as uuidv4 } from 'uuid';
import { LoadingPage } from '../loadingPage/LoadingPage';
import redditLogo from '../../assets/reddit_logo.svg';
import { LoadingSpinner } from '../../utils/LoadingSpinner';
import { iconStyle, subredditSectionStyle } from './styles';


export const Subreddits = () => {
    const dispatch = useDispatch();
    const [fetchLink, setFetchLink] = useState('https://www.reddit.com/r/popular.json');
    
    // Articles
    const articles = useSelector(selectArticles);
    const searchedArticles = useSelector(selectSearchedArticles);
    const isLoadingArticles = useSelector(selectArticlesIsLoading);
    const articlesError = useSelector(selectArticlesFetchError);
    const isFiltered = useSelector(selectIsFiltered);

    useEffect(() => {
        dispatch(fetchArticles(fetchLink));
    }, [dispatch, fetchLink])

    // Subreddits
    const subReddits = useSelector(selectSubReddits);
    const isLoadingSubreddits = useSelector(selectSubredditsIsLoading);
    const subredditsError = useSelector(selectSubredditsFetchError);

    useEffect(() => {
        dispatch(fetchSubreddits(fetchLink))
    }, [dispatch])

    const handleClick = link => {
        setFetchLink(link)
    }

    let toSend;
    if (isFiltered) {
        toSend = searchedArticles;
    } else if (!isFiltered) {
        toSend = articles;
    }

    return (
        <section>
            <section className='articlesSection' style={{backgroundColor: 'rgb(251, 251, 251)', padding: '5px 0 5px 20px'}}>
                {
                    isLoadingArticles ? <LoadingSpinner marginTop='5vh' />
                    
                    : articlesError ? <p>An error ocurred while requesting Articles :(</p>
                
                    : isLoadingSubreddits ? '' 
                    
                    : toSend.map(article => <Article key={uuidv4()} article={article} />)
                }
            </section>
            <section style={subredditSectionStyle}>
                <h2 style={{marginBottom: 20, color: 'rgb(30,30,30)'}}>Subreddits</h2>
                <ul>
                    <li 
                        className='subreddit' 
                        onClick={() => handleClick('https://www.reddit.com/r/popular.json')}
                        style={{listStyleType: 'none', padding: '20px 15px'}}
                        key={uuidv4()}
                    >
                        <figure style={{display: 'flex', alignItems: 'center'}}>
                            <img src={redditLogo} style={iconStyle} alt='home' />
                            <figcaption style={{paddingLeft: 10, fontWeight: 'bolder'}}>Home</figcaption>
                        </figure>
                    </li>
                    {   
                        isLoadingSubreddits ? <LoadingPage />
                        : subredditsError ? <p>An error ocurred while requesting Subreddits :(</p>
                        : subReddits.map(sub => {
                            let subRedditLink = `https://www.reddit.com/r/${sub.name}.json`;

                            return (
                                <li onClick={() => handleClick(subRedditLink)} 
                                    className='subreddit' style={{listStyleType: 'none', padding: '20px 15px'}} 
                                    key={uuidv4()}
                                >
                                    <figure style={{display: 'flex', alignItems: 'center'}}>
                                        <img src={sub.icon || redditLogo} style={iconStyle} alt='' />
                                        <figcaption style={{paddingLeft: 10, fontWeight: 'bolder'}}>{sub.name}</figcaption>
                                    </figure>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        </section>
    )
}