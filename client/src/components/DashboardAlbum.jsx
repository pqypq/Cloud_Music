import React, {useEffect, useState} from "react"
import {useStateValue} from "../Context/StateProvider"
import {actionType} from "../Context/reducer"
import {getAllAlbums, getAllSongs} from "../api"
import ArtistAlbumCard from "./ArtistAlbumCard"
import AlbumDetail from "./AlbumDetail"


const DashboardAlbum = () => {
    const [{allSongs, allAlbums}, dispatch] = useStateValue()
    const [showAlbumDetail, setShowAlbumDetail] = useState(false)
    const [showAlbums, setShowAlbums] = useState(true)
    const [albumData, setAlbumData] = useState()

    useEffect(() => {
        if (!allAlbums) {
            getAllAlbums().then((data) => {
                dispatch({type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data})
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

    const closeDetail = () => {
        setShowAlbums(true)
        setShowAlbumDetail(false)
    }

    return (
        <div className="w-full p-4 flex items-center justify-center flex-col">
            {showAlbums && 
                <div
                    className="relative w-full gap-3  my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
                    {allAlbums &&
                        allAlbums.map((data, index) => (
                            <div key={index} onClick={() => {
                                setAlbumData(data)
                                setShowAlbumDetail(true)
                                setShowAlbums(false)
                            }}>
                                <ArtistAlbumCard data={data} index={index} object={"album"} objectId={data.name}/>
                            </div>
                        ))}
                </div>
            }
            {showAlbumDetail && <AlbumDetail data={albumData} closeDetail={closeDetail}/>}
        </div>
    )
}

export default DashboardAlbum
