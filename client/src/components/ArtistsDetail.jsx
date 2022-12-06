import React, {Component} from 'react'
import SongContainer from "./SongContainer"
import {getAllSongsForArtist} from "../api"
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip';
import {AiOutlineClose} from "react-icons/ai";


class ArtistsDetail extends Component {
    state = {
        allSongsForArtist: [],
    }

    componentDidMount() {
        getAllSongsForArtist(this.props.artist).then(r => {
            this.setState({allSongsForArtist: r.data})
        })
    }

    render() {
        return (
            <div>
                <Box sx={{minWidth: 1536}}>
                    <Card variant="outlined">
                        <CardContent>
                            <img src={this.props.image} alt="" width={300} style={{display: "inline-block"}}/>
                            <AiOutlineClose onClick={this.props.closeDetail}
                                            style={{float: "right", display: "inline-block"}}/>
                        </CardContent>
                    </Card>
                </Box>
                <div style={{marginTop: 40}}>
                    <SongContainer data={this.state.allSongsForArtist}/>
                </div>
            </div>
        )
    }
}

export default ArtistsDetail
