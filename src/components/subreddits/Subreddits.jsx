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

    return (
        <section>
            <section>
                {
                    isLoading ? ''
                
                    : errorWhileFetching ? ''
                
                    : articles.map(article => <Article article={article} />)
                }
            </section>
            <section>
                <h2>Subreddits</h2>
                <ul>
                    {   
                        isLoading ? ''
                        : errorWhileFetching ? <li>An error ocurred while requesting Subreddits :(</li>
                        : subReddits.map((sub, index) => {
                            return (
                                <li key={index}>
                                    <img src={sub.icon} alt={sub.name} />
                                    {sub.name}
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
        </section>
    )
}