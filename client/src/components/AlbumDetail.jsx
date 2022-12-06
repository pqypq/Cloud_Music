import React, {Component} from 'react'
import Header from "./Header"
import SongContainer from "./SongContainer"
import {getAllSongsForAlbum} from "../api"

class AlbumDetail extends Component {
    state = {
        allSongsForAlbum: []
    }

    componentDidMount() {
        const url = unescape(window.location.href)
        const id = url.split("?")[1].split("=")[1]
        getAllSongsForAlbum(id).then(r => {
            this.setState({allSongsForAlbum: r.data})
        })
    }

    render() {
        return (
            <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
                <Header/>
                <SongContainer data={this.state.allSongsForAlbum}/>
            </div>
        )
    }
}

export default AlbumDetail