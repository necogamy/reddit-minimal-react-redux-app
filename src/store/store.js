import { configureStore } from '@reduxjs/toolkit';

import apiReducer from '../features/apiSlice';

const store = configureStore({
    reducer: {
        apiSlice: apiReducer
    }
})

export default store;