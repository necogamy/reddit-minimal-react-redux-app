import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSubreddits = createAsyncThunk(
    'subreddits/fetchSubreddits',
    async (popularApi, thunkAPI) => {
        let json;

        try {
            const response = await fetch(popularApi);

            if (response.ok) {
                json = await response.json();
                const subRedditsArray = json.data.children;
                let structuredResponse = [];

                for (let i = 0; i < subRedditsArray.length; i++) {
                    const subReddit = subRedditsArray[i].data;
                    
                    let icon;

                    let index = 0;
                    while (index < subReddit.all_awardings.length) {
                        if (subReddit.all_awardings[index]) {
                            icon = subReddit.all_awardings[index].icon_url;
                            index = subReddit.all_awardings.length;
                        }
                        index++;
                    }

                    structuredResponse.push(
                        {
                            name: subReddit.subreddit,
                            icon,
                        }
                    )
                }

                return structuredResponse;
            }
            
        } catch (e) {
            throw e;
        }

    }
)

const fetchSubredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subReddits: [],
        isLoading: false,
        fetchError: false
    },
    reducers: {},
    extraReducers: {
        [fetchSubreddits.pending]: (state, action) => {
            state.fetchError = false;
            state.isLoading = true;
        },
        [fetchSubreddits.fulfilled]: (state, action) => {
            state.fetchError = false;
            state.isLoading = false;

            state.subReddits = action.payload;
        },
        [fetchSubreddits.rejected]: (state, action) => {
            state.fetchError = true;
            state.isLoading = false;
            console.log(action.error.stack);
        }
    }
})

export default fetchSubredditsSlice.reducer;

export const selectSubReddits = state => state.fetchSubReddits.subReddits;
export const selectIsLoading = state => state.fetchSubReddits.isLoading;
export const selectFetchError = state => state.fetchSubReddits.fetchError;