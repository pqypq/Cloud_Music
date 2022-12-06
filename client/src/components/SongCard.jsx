import React from "react"
import {useStateValue} from "../Context/StateProvider"
import {actionType} from "../Context/reducer"
import {motion} from "framer-motion"

const SongCard = ({data, index}) => {
    const [{allSongs, song, isSongPlaying}, dispatch] = useStateValue()

    const addSongToContext = () => {
        if (!isSongPlaying) {
            dispatch({
                type: actionType.SET_SONG_PLAYING,
                isSongPlaying: true,
            })
        }
        if (song !== index) {
            dispatch({
                type: actionType.SET_SONG,
                song: index,
            })
        }
    }

    return (
        <motion.div
            whileTap={{scale: 0.8}}
            initial={{opacity: 0, translateX: -50}}
            animate={{opacity: 1, translateX: 0}}
            transition={{duration: 0.3, delay: index * 0.1}}
            className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
            onClick={addSongToContext}
        >

            <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
                <motion.img
                    whileHover={{scale: 1.05}}
                    src={data.imageURL}
                    alt=""
                    className=" w-full h-full rounded-lg object-cover"
                />
            </div>

            <p className="text-base text-headingColor font-semibold my-2">
                {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
                <span className="block text-sm text-gray-400 my-1">{data.artist}</span>
            </p>
        </motion.div>
    )
}

export default SongCard