import React, {Component} from 'react'
import Header from "./Header"
import SongContainer from "./SongContainer"
import {getAllSongsForAlbum} from "../api"
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import {AiOutlineClose} from "react-icons/ai";

class AlbumDetail extends Component {
    state = {
        allSongsForAlbum: []
    }

    componentDidMount() {
        getAllSongsForAlbum(this.props.data.name).then(r => {
            this.setState({allSongsForAlbum: r.data})
        })
    }

    render() {
        console.log(this.props.data)

        return (
            <div className={"w-full h-auto"}>
                <Card variant="outlined">
                    <CardContent>
                        <img src={this.props.data.imageURL} alt="" width={300} style={{display: "inline-block"}}/>
                        <span style={{verticalAlign: "top", marginLeft: 30, fontSize: 25}}>
                            <b>{this.props.data.album}</b>
                        </span>
                        <AiOutlineClose onClick={this.props.closeDetail}
                                        style={{float: "right", display: "inline-block"}}/>
                    </CardContent>
                </Card>
                <div style={{marginTop: 40}}>
                    <SongContainer data={this.state.allSongsForAlbum}/>
                </div>
            </div>
        )
    }
}

export default AlbumDetail