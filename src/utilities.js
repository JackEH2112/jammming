import axios from 'axios';
import { useState } from 'react';





const CLIENT_ID = '734bd31883e6461bb81507e1075c9847'
const REDIRECT_URI = 'http://localhost:3000'
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const RESPONSE_TYPE = 'token'
const SCOPES = 'playlist-modify-private playlist-modify-public'

export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`




export const logout = () => {
    setToken('')
    window.localStorage.removeItem('token')
}

export const searchArtists = async (e) => {
    e.preventDefault(); 
    const response = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
        Authorization: `Bearer ${token}`
        },
        params: {
        q: searchKey,
        type: 'track'
        }
    })
    setData(response.data.tracks.items);
}



