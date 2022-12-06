import React, {Component} from 'react';
import Header from "./Header";
import SongContainer from "./SongContainer";
import {getAllSongsForArtist} from "../api";

class ArtistsDetail extends Component {
    state = {
        allSongsForSinger: []
    }

    componentDidMount() {
        const url = unescape(window.location.href)
        const id = url.split("?")[1].split("=")[1]
        getAllSongsForArtist(id).then(r => {
            this.setState({allSongsForSinger: r.data})
        })
    }

    render() {
        return (
            <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
                <Header/>
                <SongContainer data={this.state.allSongsForSinger}/>
            </div>
        );
    }
}

export default ArtistsDetail;
