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
                        <AiOutlineClose onClick={this.props.closeDetail} style={{float: "right", display: "inline-block"}}/>
                        <div style={{display: "table-cell", width: "30%"}}>
                                <img src={this.props.data.imageURL} alt=""/>
                        </div>
                        <div style={{display: "table-cell", width: "70%", verticalAlign: "top", fontSize: 25}}>
                            <div style={{marginLeft: 10}}>
                                <b>{this.props.data.name}</b>
                                {this.renderIntroduction()}
                            </div>
                        </div>
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
            <p class="break-words" style={{fontSize: 20}}>
                This artist's creation comes from the deepest emotion. His voice sings the brilliance of the soul. He regards music and dreams as energy, and he has reached an unreplaceable position all the way. He wrote the most moving classic movement in the Chinese music scene, shaking dozens of people in Asia.
            </p>
        );
    }
}

class ArtistIntroduction2 extends Component {
    render() {
        return (
            <p class="break-words" style={{fontSize: 20}}>
                Born in New Taipei City, Taiwan Province on January 18, 1979, is a native of YongchunCounty, Quanzhou City, Fujian Province. He is a Taiwanese pop singer, original musician, actor, director, and screenwriter. 
            </p>
        );
    }
}

class ArtistIntroduction3 extends Component {
    render() {
        return (
            <p class="break-words" style={{fontSize: 20}}>
                Born in Shanghai on July 17, 1983, he is a male pop singer, film and television actor, and music producer in Mainland China. He graduated from Glion Hotel Management College.
            </p>
        );
    }
}
