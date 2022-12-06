import React, {useEffect, useState} from "react"
import {useStateValue} from "../Context/StateProvider"
import {IoMdClose} from "react-icons/io"
import {IoArrowRedo, IoMusicalNote} from "react-icons/io5"
import {motion} from "framer-motion"

import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"
import {actionType} from "../Context/reducer"
import {getAllSongs} from "../api"
import {RiPlayListFill} from "react-icons/ri"

const MusicPlayer = () => {
    const [isPlayList, setIsPlayList] = useState(false)
    const [{allSongs, song, isSongPlaying, miniPlayer}, dispatch] = useStateValue()

    let allSongsMap = {}
    for (let s of allSongs) {
        allSongsMap[s._id] = s
    }

    let nextMap = {}
    let prevMap = {}
    for (let i = 0; i < allSongs.length; i++) {
        if (i === allSongs.length - 1) {
            nextMap[allSongs[i]._id] = allSongs[0]._id
        } else {
            nextMap[allSongs[i]._id] = allSongs[i + 1]._id
        }

        if (i === 0) {
            prevMap[allSongs[0]._id] = allSongs[allSongs.length - 1]._id
        } else {
            prevMap[allSongs[i]._id] = allSongs[i - 1]._id
        }
    }

    const closeMusicPlayer = () => {
        if (isSongPlaying) {
            dispatch({
                type: actionType.SET_SONG_PLAYING,
                isSongPlaying: false,
            })
        }
    }

    const togglePlayer = () => {
        if (miniPlayer) {
            dispatch({
                type: actionType.SET_MINI_PLAYER,
                miniPlayer: false,
            })
        } else {
            dispatch({
                type: actionType.SET_MINI_PLAYER,
                miniPlayer: true,
            })
        }
    }

    const nextTrack = () => {
        dispatch({
            type: actionType.SET_SONG,
            song: nextMap[song],
        })
    }

    const previousTrack = () => {
        dispatch({
            type: actionType.SET_SONG,
            song: prevMap[song],
        })
    }

    return (
        <div className="w-full full flex items-center gap-3 overflow-hidden">
            <div
                className={`w-full full items-center gap-3 p-4 ${
                    miniPlayer ? "absolute top-40" : "flex relative"
                }`}
            >
                <img
                    src={allSongsMap[song]?.imageURL}
                    className="w-40 h-20 object-cover rounded-md"
                    alt=""
                />
                <div className="flex items-start flex-col">
                    <p className="text-xl text-headingColor font-semibold">
                        {`${
                            allSongsMap[song]?.name.length > 20
                                ? allSongsMap[song]?.name.slice(0, 20)
                                : allSongsMap[song]?.name
                        }`}{" "}
                        <span className="text-base">({allSongsMap[song]?.album})</span>
                    </p>
                    <p className="text-textColor">
                        {allSongsMap[song]?.artist}{" "}
                        <span className="text-sm text-textColor font-semibold">
              ({allSongsMap[song]?.category})
            </span>
                    </p>
                    <motion.i
                        whileTap={{scale: 0.8}}
                        onClick={() => setIsPlayList(!isPlayList)}
                    >
                        <RiPlayListFill className="text-textColor hover:text-headingColor text-3xl cursor-pointer"/>
                    </motion.i>
                </div>
                <div className="flex-1">
                    <AudioPlayer
                        src={allSongsMap[song]?.songUrl}
                        onPlay={() => console.log("is playing")}
                        autoPlay={true}
                        showSkipControls={true}
                        onClickNext={nextTrack}
                        onClickPrevious={previousTrack}
                    />
                </div>
                <div className="h-full flex items-center justify-center flex-col gap-3">
                    <motion.i whileTap={{scale: 0.8}} onClick={closeMusicPlayer}>
                        <IoMdClose className="text-textColor hover:text-headingColor text-2xl cursor-pointer"/>
                    </motion.i>
                    <motion.i whileTap={{scale: 0.8}} onClick={togglePlayer}>
                        <IoArrowRedo className="text-textColor hover:text-headingColor text-2xl cursor-pointer"/>
                    </motion.i>
                </div>
            </div>

            {isPlayList && (
                <>
                    <PlayListCard/>
                </>
            )}

            {miniPlayer && (
                <motion.div
                    initial={{opacity: 0, scale: 0.6}}
                    animate={{opacity: 1, scale: 1}}
                    className="fixed right-2 bottom-2 "
                >
                    <div className="w-40 h-40 rounded-full flex items-center justify-center  relative ">
                        <div className="absolute inset-0 rounded-full bg-red-600 blur-xl animate-pulse"></div>
                        <img
                            onClick={togglePlayer}
                            src={allSongsMap[song]?.imageURL}
                            className="z-50 w-32 h-32 rounded-full object-cover cursor-pointer"
                            alt=""
                        />
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export const PlayListCard = () => {
    const [{allSongs, song, isSongPlaying}, dispatch] = useStateValue()

    useEffect(() => {
        if (!allSongs) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.data,
                })
            })
        }
    }, [])

    console.log(song)

    const allSongsMap = {}
    for (let song of allSongs) {
        allSongsMap._id = song
    }

    const setCurrentPlaySong = (songId) => {
        if (!isSongPlaying) {
            dispatch({
                type: actionType.SET_SONG_PLAYING,
                isSongPlaying: true,
            })
        }
        if (song !== songId) {
            dispatch({
                type: actionType.SET_SONG,
                song: songId,
            })
        }
    }

    return (
        <div
            className="absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary">
            {allSongs.length > 0 ? (
                allSongs.map((music, index) => (
                    <motion.div
                        key={index}
                        initial={{opacity: 0, translateX: -50}}
                        animate={{opacity: 1, translateX: 0}}
                        transition={{duration: 0.3, delay: index * 0.1}}
                        className={`group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer ${
                            music?._id === song._id ? "bg-card" : "bg-transparent"
                        }`}
                        onClick={() => setCurrentPlaySong(music._id)}
                    >
                        <IoMusicalNote
                            className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer"/>

                        <div className="flex items-start flex-col">
                            <p className="text-lg text-headingColor font-semibold">
                                {`${
                                    music?.name.length > 20
                                        ? music?.name.slice(0, 20)
                                        : music?.name
                                }`}{" "}
                                <span className="text-base">({music?.album})</span>
                            </p>
                            <p className="text-textColor">
                                {music?.artist}{" "}
                                <span className="text-sm text-textColor font-semibold">
                  ({music?.category})
                </span>
                            </p>
                        </div>
                    </motion.div>
                ))
            ) : (
                <></>
            )}
        </div>
    )
}

export default MusicPlayer
