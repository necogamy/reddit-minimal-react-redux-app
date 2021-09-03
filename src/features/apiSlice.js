import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const popularRedditApi = 'https://www.reddit.com/r/popular.json';

export const fetchSubreddits = createAsyncThunk(
    'subreddits/fetchSubreddits',
    async (redditApi, thunkAPI) => {
        let json;

        try {
            const response = await fetch(redditApi);

            if (response.ok) {
                json = await response.json();
                const subRedditsArray = json.data.children;
                let structuredResponse = [];
    
                for (let i = 0; i < subRedditsArray; i++) {
                    const subReddit = subRedditsArray[i].data;
                    let video;

                    if (subReddit.is_video) {
                        video = subReddit.media.reddit_video.fallback_url;
                    }

                    structuredResponse.push(
                        {
                            name: subReddit.subreddit,
                            likes: subReddit.ups,
                            icon: subReddit.icon_url,
                            comments: `https://reddit.com${subReddit.permalink}`,
                            numComments: subReddit.num_comments,
                            author: subReddit.author,
                            video,
                            title: subReddit.title,
                            image: subReddit.url
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

const apiSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subReddits: [],
        articles: [],
        isLoading: false,
        fetchError: false
    },
    reducers: {},
    extraReducers: {
        [fetchSubreddits.pending]: (state, action) => {
            state.isLoading = true;
            state.fetchError = false;
        },
        [fetchSubreddits.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.fetchError = false;

            let isFirstTime = true;
            if (isFirstTime) {
                state.subReddits = action.payload;
                isFirstTime = false;
            }

            state.articles = action.payload;
        },
        [fetchSubreddits.rejected]: (state, action) => {
            state.isLoading = false;
            state.fetchError = true;
        }
    }
});

export default apiSlice.reducer;

export const selectArticles = state => state.articles;
export const selectSubReddits = state => state.subReddits;
export const selectIsLoading = state => state.isLoading;
export const selectFetchError = state => state.fetchError;