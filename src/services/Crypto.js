import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoHeaders = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_CRYPTO
}
const baseUrl = 'https://coinranking1.p.rapidapi.com'
const createRequest = (url)=>({url, headers: cryptoHeaders})
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder)=>({
        getCrypto: builder.query({
            query: (count)=> createRequest(`/coins?limit=${count}`)
        }),
        getCoinDetails: builder.query({
            query: (coinId)=> createRequest(`/coin/${coinId}`)
        }),
        getCoinHistory: builder.query({
            query: ({coinId, timePeriod})=> createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
        })
    })
})

export const {
    useGetCryptoQuery,
    useGetCoinDetailsQuery,
    useGetCoinHistoryQuery,
} = cryptoApi