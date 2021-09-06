import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchComments, 
    selectComments, 
    selectFetchError, 
    selectIsLoading 
} from '../../features/fetchComments/fetchCommentsSlice';
import { changeHoursToDays } from '../../utils/hoursToDays';


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
                isLoading ? <p>Is Loading</p>
                : fetchError ? <p>An error ocurred while loading comments :(</p>
                : comments.map(comment => {
                    return (
                        <article style={{animation: 'transitionIn .75s'}}>
                            <section>
                                <p>{comment.author}</p>
                                <h4>{comment.comment}</h4>
                            </section>
                            <section>
                                <p>{changeHoursToDays(comment.time)}</p>
                            </section>
                        </article>
                    )
                })
            }
        </section>
    )
}