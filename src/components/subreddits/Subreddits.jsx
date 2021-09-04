import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    selectSubReddits,
    selectIsLoading, 
    selectFetchError,
    selectArticles
} from '../../features/apiSlice';
import { fetchSubreddits } from '../../features/apiSlice';
import { Article } from '../article/Article';
import { v4 as uuidv4 } from 'uuid';

export const Subreddits = () => {
    const popularRedditApi = 'https://www.reddit.com/r/popular.json';
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSubreddits(popularRedditApi));
    }, [dispatch])
    
    const subReddits = useSelector(selectSubReddits);
    const articles = useSelector(selectArticles);
    const isLoading = useSelector(selectIsLoading);
    const errorWhileFetching = useSelector(selectFetchError);

    const iconStyle = {
        border: '2px solid rgb(30, 30, 30)',
        borderRadius: '50%',
        width: '13%',
    }

    const subredditSectionStyle = {
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)',
        padding: 20, 
        backgroundColor: '#fff',
        height: '100%'
    }

    return (
        <section>
            <section style={{backgroundColor: 'rgb(251, 251, 251)', padding: '5px 0 5px 20px'}}>
                {
                    isLoading ? ''
                
                    : errorWhileFetching ? ''
                
                    : articles.map(article => <Article key={uuidv4()} article={article} />)
                }
            </section>
            <section style={subredditSectionStyle}>
                <h2 style={{marginBottom: 20, color: 'rgb(30,30,30)'}}>Subreddits</h2>
                <ul>
                    {   
                        isLoading ? ''
                        : errorWhileFetching ? <li>An error ocurred while requesting Subreddits :(</li>
                        : subReddits.map(sub => {
                            return (
                                <li className='subreddit' style={{listStyleType: 'none', padding: '20px 15px'}} key={uuidv4()}>
                                    <figure style={{display: 'flex', alignItems: 'center'}}>
                                        <img src={sub.icon} style={iconStyle} alt={sub.name} />
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