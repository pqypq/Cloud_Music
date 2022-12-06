import React from "react"
import {Route, Routes} from "react-router-dom"
import {DashboardNewSong, Header} from "."
import DashboardAlbum from "./DashboardAlbum"
import DashboardArtist from "./DashboardArtist"
import DashboardSongs from "./DashboardSongs"


const Dashboard = () => {

    return (
        <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
            <Header/>

            <div className="my-4 w-full p-4">
                <Routes>
                    <Route path="/songs" element={<DashboardSongs/>}/>
                    <Route path="/artist" element={<DashboardArtist/>}/>
                    <Route path="/albums" element={<DashboardAlbum/>}/>
                    <Route path="/newSong" element={<DashboardNewSong/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard
