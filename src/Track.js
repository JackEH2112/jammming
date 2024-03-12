import React from "react";

function Track(props) {
    const {track, addToPlaylist, removeFromPlaylist, trackIsInPlaylist} = props;

    const handleClick = (track) => {
        if(trackIsInPlaylist === true){
            removeFromPlaylist(track.id);
        }
        else{
            addToPlaylist(track);
        }
    }

    //const [labelVariable, setLabelVariable] = useState('');

    /*function getLabelVariable() {
        if(track.playlist){
            setLabelVariable('Remove track from playlist')
        }
        else{
            setLabelVariable('Add track to playlist')
        }
    }*/

    return(
        <li className="Track">
            <div className="songName">{track.name}</div>
            <div className="songInfo">Artist: {track.artists.map(artist => artist.name)} || Album: {track.album.name}</div>
            <button 
                type="button"
                className="playlistAddRemove"
                /*aria-label={getLabelVariable}*/
                onClick={() => {
                    handleClick(track);
                  }}>
                    {trackIsInPlaylist ? '-' : '+'}
            </button>
        </li>
    )
}

export default Track;