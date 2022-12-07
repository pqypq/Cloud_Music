import React, {Component} from 'react'
import SongContainer from "./SongContainer"
import {getAllSongsForArtist} from "../api"
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import {AiOutlineClose} from "react-icons/ai";


class ArtistsDetail extends Component {
    state = {
        allSongsForArtist: [],
    }

    componentDidMount() {
        getAllSongsForArtist(this.props.data.name).then(r => {
            this.setState({allSongsForArtist: r.data})
        })
    }

    render() {
        return (
            <div className={"w-full h-auto"}>
                <Card variant="outlined">
                    <CardContent>
                        <img src={this.props.data.imageURL} alt="" width={300} style={{display: "inline-block"}}/>
                        <span style={{verticalAlign: "top", marginLeft: 30, fontSize: 25}}>
                            <b>{this.props.data.name}</b>
                        </span>
                        <AiOutlineClose onClick={this.props.closeDetail}
                                        style={{float: "right", display: "inline-block"}}/>
                    </CardContent>
                </Card>
                <div style={{marginTop: 40}}>
                    <SongContainer data={this.state.allSongsForArtist}/>
                </div>
            </div>
        )
    }
}

export default ArtistsDetail
