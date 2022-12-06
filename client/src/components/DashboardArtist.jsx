import React, {useEffect} from "react"
import {useStateValue} from "../Context/StateProvider"
import {getAllArtist, getAllSongs} from "../api"
import {actionType} from "../Context/reducer"
import ArtistAlbumCard from "./ArtistAlbumCard"

const DashboardArtist = () => {
    const [{allSongs, artists}, dispatch] = useStateValue()

    useEffect(() => {
        if (!artists) {
            getAllArtist().then((data) => {
                dispatch({type: actionType.SET_ARTISTS, artists: data.data})
            })
        }
    }, [])

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

    return (
        <div className="w-full p-4 flex items-center justify-center flex-col">
            <div
                className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
                {artists &&
                    artists.map((data, index) => (
                        <div key={index}>
                            <ArtistAlbumCard data={data} index={index} object={"artist"} objectId={data.name}/>
                        </div>
                    ))}
            </div>
        </div>
    )
}


export default DashboardArtist
