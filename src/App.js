//import logo from './logo.svg';
//import SearchBar from './SearchBar.js';
import './App.css';
import React, {useState, useEffect} from 'react';
import SearchResults from './SearchResults.js';
import axios from 'axios';

function App(props) {
  const CLIENT_ID = '734bd31883e6461bb81507e1075c9847'
  const REDIRECT_URI = 'http://localhost:3000'
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
  const RESPONSE_TYPE = 'token'
  const SCOPES = 'playlist-modify-private playlist-modify-public'

  const [token, setToken] = useState('')
  const [data, setData] = useState()

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    if(!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith('access_token')).split('=')[1]

      window.location.hash = ''
      window.localStorage.setItem('token', token)
    }
    setToken(token)
  },[])

  const logout = () => {
    setToken('')
    window.localStorage.removeItem('token')
  }

  const [searchKey, setSearchKey] = useState('');

  const searchArtists = async (e) => {
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


  return (
    <>
      <div id='heading'>
        <h1 className='titleHeading'>Jammming!</h1>
        <p className='titleHeading'>Personal Playlist Maker</p>
        
        {!token ?
          <a className='logButton'
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            <button> Login To Spotify</button>
          </a> 
          : 
        <button className='logButton' onClick={logout}>Logout</button>}

        {token ?
        <div id='searchForm'>
          <form 
            onSubmit={searchArtists}
          >
            <input type='text' onChange={e => setSearchKey(e.target.value)}/>
            <button type='submit'>Find My Jammms</button>
          </form>
        </div> :
          <p id='loginRequest'>Please Login</p>}
      </div>
      <SearchResults
        id='searchResults'
        searchResults = {data}
        token={token}
      />
    </>
  );
}

export default App;