import React, {useEffect} from "react"
import {useStateValue} from "../Context/StateProvider"
import {actionType} from "../Context/reducer"
import {getAllAlbums} from "../api"
import ArtistAlbumCard from "./ArtistAlbumCard"


const DashboardAlbum = () => {
    const [{allAlbums}, dispatch] = useStateValue()

    useEffect(() => {
        if (!allAlbums) {
            getAllAlbums().then((data) => {
                dispatch({type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data})
            })
        }
    }, [])

    return (
        <div className="w-full p-4 flex items-center justify-center flex-col">
            <div
                className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
                {allAlbums &&
                    allAlbums.map((data, index) => (
                        <div key={index}>
                            <ArtistAlbumCard data={data} index={index} object={"album"}/>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default DashboardAlbum
