import SongCard from "./SongCard"
import React, {Component} from 'react'

class SongContainer extends Component {
    render() {
        return (
            <div className=" w-full  flex flex-wrap gap-3  items-center justify-evenly">
                {this.props.data &&
                    this.props.data.map((song, i) => (
                        <SongCard key={song._id} data={song} index={i}/>
                    ))}
            </div>
        )
    }
}

export default SongContainer
