import React, {useState} from "react";
import axios from "axios";
import Track from "./Track";
import './Playlist.css'
//import { json } from "react-router-dom";

function Playlist(props) {
    const {playlist, removeFromPlaylist, token} = props;

    const [playlistName, setPlayListName] = useState('')
    const [playlists, setPlaylists] = useState([])
    const uriArray = [];
    let playlistId = 'hello'

    
    async function handleSubmit(e) {
        e.preventDefault();
        if(playlistName === ''){
            alert('Must have a playlist name!')
        }
        else if(playlist.length === 0){
            alert('No tracks in playlist')
        }
        else if(!token){
            alert('You need to be logged in to upload playlists to Spotify')
        }
        else{
            //get user id
            const responseUserId = await axios.get ('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const USER_ID = responseUserId.data.id;

            //Upload playlist to Spotify
            /*await axios({
                method: 'post',
                url: `https://api.spotify.com/v1/users/${USER_ID}/playlists`,
                headers: {'Authorization': `Bearer ${token}`},
                data: {
                    'name': `${playlistName}`,
                    'description': 'Playlist created with JAMMMING app',
                    'public': false
                }
            })
            .then(async function (response) {
                playlistId = response.data.id;
                console.log(playlistId)
            })
            .catch(function (error) {
                console.log(error);
                alert(error)
            });*/

            const uploadPlaylist = async () => {
                try {
                    const response = await axios.post(`https://api.spotify.com/v1/users/${USER_ID}/playlists`,
                        {
                            'name': `${playlistName}`,
                            'description': 'Playlist created with JAMMMING app',
                            'public': false
                        },
                        {headers: {'Authorization': `Bearer ${token}`}}
                    );
                    playlistId = response.data.id;
                    console.log(`Playlist upload response:`)
                    console.log(response);
                    //Get track uris
                    const trackPostUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
                    for (let i = 0; i < playlist.length; i++){
                        uriArray.push(playlist[i].uri)
                    }
                    //Post uris to playlist
                    const uploadTracks = async () => {
                        try {
                            const response = await axios.post(`${trackPostUrl}`,{},
                                {
                                    "uris": uriArray, 
                                    "postition": 0
                                },
                                {headers: {'Authorization' : `Bearer ${token}`}}
                            );
                            console.log(`Tracks to playlist response:`);
                            console.log(response)
                            //reset
                            alert(`Upload ${playlistName} successful`)
                            setPlaylists(playlists => [...playlists, playlistName])
                            setPlayListName('')
                            playlist.splice(0)
                            playlistId = '';
                        }
                        catch(error){
                            console.log(`Tracks to playlist error:`);
                            if(error.response){
                                console.log(error.response)
                            }
                            else if(error.request){
                                console.log(error.request)
                            }
                            else if(error.message){
                                console.log(error.message)
                            }
                        }
                    }
                    /*await axios({
                        method: "post",
                        url: `${trackPostUrl}`,
                        headers: {"Authorization": `Bearer ${token}`, "Content-Type": 'application/json'},
                        data: {
                            
                        }
                    })
                    .then(function (response) {
                        console.log(response)  
                        //reset
                        alert(`Upload ${playlistName} successful`)
                        setPlaylists(playlists => [...playlists, playlistName])
                        setPlayListName('')
                        playlist.splice(0)
                    })
                    .catch(function (error) {
                        if(error.response){
                            console.log(error.response.config.data)
                        }
                        else if(error.request){
                            console.log(error.request)
                        }
                        else if(error.message){
                            console.log(error.message)
                        }
                        else{
                            console.log('Good luck')
                        }
                    })*/
                    
                    uploadTracks();
                }
                catch(error){
                    console.log(error);
                }
            }

            uploadPlaylist();

            
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    className='heading'
                    onChange={(e) => setPlayListName(e.target.value)}
                    value={playlistName}
                />
                <ul>
                    {playlist?.map((track) => (
                        <Track
                            trackIsInPlaylist = {true}
                            key={track.id}
                            track={track}
                            removeFromPlaylist={() => {removeFromPlaylist(track)}} 
                        />
                    ))}
                </ul>
                <button className='heading' type="submit">
                    Upload My Jammms!
                </button>
            </form>
            {/*add functionality to be able to change playlist names*/}
            <h3 className='heading'>Saved Playlists</h3>
            <ul>
                {playlists?.map((pl) => (
                    <li>
                        {pl}
                    </li>
                ))}
            </ul>
            
        </>
    )
}

export default Playlist;