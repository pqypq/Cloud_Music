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
        allSongsForAlbum: [],
        introduction: 1
    }

    componentDidMount() {
        getAllSongsForAlbum(this.props.data.name).then(r => {
            this.setState({allSongsForAlbum: r.data})
        })
        const max = 3
        const min = 1
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        this.setState({introduction: num})
    }

    renderIntroduction = () => {
        if (this.state.introduction === 1) {
            return <AlbumIntroduction1/>
        }
        if (this.state.introduction === 2) {
            return <AlbumIntroduction2/>
        }
        if (this.state.introduction === 3) {
            return <AlbumIntroduction3/>
        }
    }

    render() {
        console.log(this.props.data)

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
                    <SongContainer data={this.state.allSongsForAlbum}/>
                </div>
            </div>
        )
    }
}

export default AlbumDetail

class AlbumIntroduction1 extends Component {
    render() {
        return (
            <p class="break-words" style={{fontSize: 20}}>
                It fully reflects the diversity and variety of singers in music, as well as the ability to master various types of music. In this album, the artist used a lot of legato singing, although he succeeded in breaking through the limitation of correct words and accents, but it also made the lyrics largely blurred. The album mainly consists of tough rhythm and blues and rap, no matter the genre or subject matter, the commercial orientation tends to decline.
            </p>
        );
    }
}

class AlbumIntroduction2 extends Component {
    render() {
        return (
            <p class="break-words" style={{fontSize: 20}}>
                In this record, the acoustic guitar solo and a few piano notes in the opening section are sad, and the Rap section gradually emerges with the guitar and piano sounds. After entering the chorus, the artist started his own unique low-pitched singing. Beautiful melody and sad atmosphere, light, melancholy and poignant. This record combines rock, electronic, folk and classical works, creatively. In the arrangement part, the male accompaniment and the ringtone of the phone in the prelude of the song are combined with the band accompaniment with a bit of heavy metal feeling, which is very cool. The female accompaniment singing during the interlude gives people a mysterious feeling.
            </p>
        );
    }
}

class AlbumIntroduction3 extends Component {
    render() {
        return (
            <p class="break-words" style={{fontSize: 20}}>
                This record uses Chinese classical style songs accompanied by guzheng, and the lyrics express the state of mind of idiots and women in the world. The song uses a classical string concerto, which is magnificent. The bridge section at the end is in a standard classical form, and there is an electronically synthesized violin solo in the middle, which is very interesting to savor. In the composition part, it is a bold attempt to combine rock and symphony.
            </p>
        );
    }
}
