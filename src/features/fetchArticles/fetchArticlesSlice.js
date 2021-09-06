import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { timeDifference } from  '../../utils/timeConverter';


export const fetchArticles = createAsyncThunk(
    'articles/fetchArticles',
    async (api, thunkAPI) => {
        let json;

        try {
            const response = await fetch(api);

            if (response.ok) {
                json = await response.json();
                const postsArray = json.data.children;
                let structuredResponse = [];
    
                for (let i = 0; i < postsArray.length; i++) {
                    const post = postsArray[i].data;
                    let video;
                    if (post.is_video) {
                        video = post.media.reddit_video.fallback_url;
                    }

                    let mediaEmbed;
                    if (post.media_embed.content) {
                        mediaEmbed = post.media_embed.content
                    }

                    structuredResponse.push(
                        {
                            likes: post.ups,
                            comments: `https://www.reddit.com${post.permalink}.json`,
                            numComments: post.num_comments,
                            author: post.author,
                            video,
                            title: post.title,
                            image: post.url,
                            time: timeDifference(post.created),
                            mediaEmbed
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

const fetchArticlesSlice = createSlice({
    name: 'articles',
    initialState: {
        articles: [],
        searchedArticles: [],
        isLoading: false,
        fetchError: false,
        isFiltered: false
    },
    reducers: {
        searchResults: (state, action) => {
            const searchText = action.payload;
            const matchArticles = new RegExp(searchText, 'i');

            const onlyMatchedArticles = state.articles.filter(article => matchArticles.test(article.title))
            state.searchedArticles = onlyMatchedArticles;
            state.isFiltered = true;
        }
    },
    extraReducers: {
        [fetchArticles.pending]: (state, action) => {
            state.isLoading = true;
            state.fetchError = false;
        },
        [fetchArticles.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.fetchError = false;

            state.articles = action.payload;
            state.isFiltered = false;
        },
        [fetchArticles.rejected]: (state, action) => {
            state.isLoading = false;
            state.fetchError = true;
            console.log(action.error.stack);
        }
    }
});

export default fetchArticlesSlice.reducer;

export const { searchResults } = fetchArticlesSlice.actions;

export const selectArticles = state => state.fetchArticles.articles;
export const selectIsLoading = state => state.fetchArticles.isLoading;
export const selectFetchError = state => state.fetchArticles.fetchError;
export const selectSearchedArticles = state => state.fetchArticles.searchedArticles;
export const selectIsFiltered = state => state.fetchArticles.isFiltered;