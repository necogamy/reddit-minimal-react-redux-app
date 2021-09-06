import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchComments,
    selectFetchError, 
    selectIsLoading,
    selectComments
} from '../../features/fetchComments/fetchCommentsSlice';
import { changeHoursToDays } from '../../utils/hoursToDays';
import { LoadingSpinner } from '../../utils/LoadingSpinner';
import { authorStyles, commentArticleStyle } from './styles';


export const Comments = ({commentLink}) => {
    const dispatch = useDispatch();

    const comments = useSelector(selectComments);
    const fetchError = useSelector(selectFetchError);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchComments(commentLink))
    }, [commentLink])

    return (
        <section>
            {
                isLoading ? <LoadingSpinner />
                : fetchError ? <p>An error ocurred while loading comments :(</p>
                : 
                comments.map(comment => {
                        return (
                            <article style={commentArticleStyle}>
                                <section>
                                    <p style={authorStyles}>{comment.author}</p>
                                    <h4 style={{fontWeight: 'lighter'}}>{comment.comment}</h4>
                                </section>
                                <section>
                                    <p style={{color: 'gray'}}>{changeHoursToDays(comment.time)}</p>
                                </section>
                            </article>
                        )
                    })
            }
        </section>
    )
}