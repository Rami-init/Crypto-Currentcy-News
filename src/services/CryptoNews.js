import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const NewsHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_CRYPTO_NEWS
}
const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url)=>({url, headers: NewsHeaders})

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder)=>({
        getCryptoNews: builder.query({
            query: ({newCategory, count})=> createRequest(`/news/search?q=${newCategory}&safeSearch=Off&textForamt=Raw&frechness=Day&count=${count}`)
        })
    })
})

export const { 
    useGetCryptoNewsQuery 
} = cryptoNewsApi