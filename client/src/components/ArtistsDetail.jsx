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
        imageURL: ""
    }

    componentDidMount() {
        // const url = unescape(window.location.href)
        console.log(window.location.href)
        console.log(this.props)
        // console.log(url)

        console.log(window.location.href.split("?", 2))
        // const id = url.split("?")[1].split("=")[1]
        // getAllSongsForArtist(id).then(r => {
        //     this.setState({allSongsForArtist: r.data})
        // })
    }

    render() {
        return (
            <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
                <Header/>
                <Box sx={{minWidth: 1330}}>
                    <Card variant="outlined">
                        <CardContent>
                            <img
                                src={this.props.data?.imageURL}
                                className="w-full h-40 object-cover rounded-md"
                                alt=""
                            />
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Box>
                <div style={{marginTop: 30}}>
                    <SongContainer data={this.state.allSongsForArtist}/>
                </div>
            </div>
        )
    }
}

export default ArtistsDetail
