import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { timeDifference } from  '../../utils/timeConverter';

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (linkAPI, thunkAPI) => {
        
        try {
            const response = await fetch(linkAPI);

            let json;
            if (response.ok) {
                json = await response.json();
                const commentsArray = json[1].data.children;
                let structuredResponse = [];

                for (let i = 0; i < commentsArray.length / 2; i++) {
                    const postComment = commentsArray[i].data;

                    structuredResponse.push({
                        comment: postComment.body,
                        time: timeDifference(postComment.created),
                        author: postComment.author
                    })
                }

                return structuredResponse;
            }
        } catch(e) {
            throw e;
        }
        
    },

);

const fetchCommentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        isLoading: false,
        fetchError: false
    },
    reducers: {},
    extraReducers: {
        [fetchComments.pending]: (state, action) => {
            state.isLoading = true;
            state.fetchError = false;
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.fetchError = false;

            state.comments = action.payload;
        },
        [fetchComments.rejected]: (state, action) => {
            state.isLoading = false;
            state.fetchError = true;
        }
    }
});

export default fetchCommentsSlice.reducer;

export const selectComments = state => state.fetchComments.comments;
export const selectIsLoading = state => state.fetchComments.isLoading;
export const selectFetchError = state => state.fetchComments.fetchError;