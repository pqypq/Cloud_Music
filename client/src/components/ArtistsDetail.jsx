import React, {Component} from 'react'
import SongContainer from "./SongContainer"
import {getAllSongsForArtist} from "../api"
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import {AiOutlineClose} from "react-icons/ai";


class ArtistsDetail extends Component {
    state = {
        allSongsForArtist: [],
        introduction: 1
    }

    componentDidMount() {
        getAllSongsForArtist(this.props.data.name).then(r => {
            this.setState({allSongsForArtist: r.data})
        })
        const max = 3
        const min = 1
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        this.setState({introduction: num})
    }

    renderIntroduction = () => {
        if (this.state.introduction === 1) {
            return <ArtistIntroduction1/>
        }
        if (this.state.introduction === 2) {
            return <ArtistIntroduction2/>
        }
        if (this.state.introduction === 3) {
            return <ArtistIntroduction3/>
        }
    }

    render() {
        return (
            <div className={"w-full h-auto"}>
                <Card variant="outlined">
                    <CardContent>
                        <img src={this.props.data.imageURL} alt="" width={300} style={{display: "inline-block"}}/>
                        <span style={{verticalAlign: "top", marginLeft: 30, fontSize: 25, display: "inline-block"}}>
                            <b>{this.props.data.name}</b>
                            {this.renderIntroduction()}
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


class ArtistIntroduction1 extends Component {
    render() {
        return (
            <div>
                <div style={{marginTop: 30}}>
                    This artist's creation comes from the deepest emotion. His voice sings the brilliance of the soul. He regards
                </div>
                <div style={{marginTop: 5}}>
                    music and dreams as energy, and he has reached an unreplaceable position all the way. He wrote the most
                </div>
                <div style={{marginTop: 5}}>
                    moving classic movement in the Chinese music scene, shaking dozens of people in Asia
                </div>
            </div>
        );
    }
}

class ArtistIntroduction2 extends Component {
    render() {
        return (
            <div>
                <div style={{marginTop: 30}}>
                    Born in New Taipei City, Taiwan Province on January 18, 1979, is a native of YongchunCounty,
                </div>
                <div style={{marginTop: 5}}>
                    Quanzhou City, Fujian Province. He is a Taiwanese pop singer, original musician, actor,
                </div>
                <div style={{marginTop: 5}}>
                    director, and screenwriter. He graduated from Tamkang Middle School
                </div>
            </div>
        );
    }
}

class ArtistIntroduction3 extends Component {
    render() {
        return (
            <div>
                <div style={{marginTop: 30}}>
                    Born in Shanghai on July 17, 1983, he is a male pop singer, film and television actor, and music
                </div>
                <div style={{marginTop: 5}}>
                    producer in Mainland China. He graduated from Glion Hotel Management College. Representative works
                </div>
                <div style={{marginTop: 5}}>
                    Serious Snow, Actor, Ugly, Gentleman, Accident, What Do You Want From Me, Just Right, A Few You
                </div>
            </div>
        );
    }
}
