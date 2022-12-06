import React, {Component} from 'react'
import Header from "./Header"
import SongContainer from "./SongContainer"
import {getAllSongsForArtist} from "../api"
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'


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
                            <img
                                src={this.props.image}
                                className="w-full h-40 object-cover rounded-md"
                                alt=""
                            />
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
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
