import { configureStore } from '@reduxjs/toolkit'
import {cryptoApi} from '../services/Crypto'
import {cryptoNewsApi} from '../services/CryptoNews'


const Store = configureStore({
    reducer: {
        [cryptoApi.reducerPath] : cryptoApi.reducer,
        [cryptoNewsApi.reducerPath] : cryptoNewsApi.reducer
    }
})

export default Store 