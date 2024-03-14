import React, {useState} from "react";
import axios from "axios";
import Track from "./Track";
import './Playlist.css'

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
                    //Get track uris
                    const trackPostUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
                    for (let i = 0; i < playlist.length; i++){
                        uriArray.push(playlist[i].uri)
                    }
                    //Post uris to playlist
                    const uploadTracks = async () => {
                        try {
                            const response = await axios.post(`${trackPostUrl}`,
                                {
                                    "uris": uriArray, 
                                    "position": 0
                                },
                                {headers: {'Authorization' : `Bearer ${token}`}}
                            );
                            console.log(response)
                            //reset
                            alert(`Upload ${playlistName} successful`)
                            setPlayListName('')
                            playlist.splice(0)
                            playlistId = '';
                        }
                        catch(error){
                            console.log(error)
                        }
                    }
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