import { configureStore } from '@reduxjs/toolkit';

import fetchArticlesReducer from '../features/fetchArticles/fetchArticlesSlice';
import fetchSubredditsReducer from '../features/fetchSubreddits/fetchSubredditsSlice';
import fetchCommentsReducer from '../features/fetchComments/fetchCommentsSlice';

export default configureStore({
    reducer: {
        fetchArticles: fetchArticlesReducer,
        fetchSubReddits: fetchSubredditsReducer,
        fetchComments: fetchCommentsReducer
    }
})