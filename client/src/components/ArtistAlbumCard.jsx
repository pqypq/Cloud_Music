import React, {Component} from 'react';
import {motion} from "framer-motion";
import {NavLink} from "react-router-dom";

class ArtistAlbumCard extends Component {
    render() {
        return (
            <NavLink to={`/${this.props.object}/detail?id=${this.props.objectId}`}>
                <motion.div
                    initial={{opacity: 0, translateX: -50}}
                    animate={{opacity: 1, translateX: 0}}
                    transition={{duration: 0.3, delay: this.props.index * 0.1}}
                    className="relative w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
                >
                    <img
                        src={this.props.data?.imageURL}
                        className="w-full h-40 object-cover rounded-md"
                        alt=""
                    />

                    <p className="text-base text-textColor">{this.props.data.name}</p>
                </motion.div>
            </NavLink>
        );
    }
}

export default ArtistAlbumCard;
