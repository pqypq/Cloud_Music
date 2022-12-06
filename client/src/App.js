import React, {useEffect, useState} from "react"
import {Route, Routes, useNavigate} from "react-router-dom"
import "./App.css"
import {getAuth,} from "firebase/auth"
import {app} from "./config/firebase.config"
import {getAllSongs, validateUser} from "./api"
import {Dashboard, Home, Loader, Login, MusicPlayer, UserProfile,} from "./components"
import {useStateValue} from "./Context/StateProvider"
import {actionType} from "./Context/reducer"
import {AnimatePresence, motion} from "framer-motion"
import ArtistsDetail from "./components/ArtistsDetail"
import AlbumDetail from "./components/AlbumDetail"

function App() {
    const firebaseAuth = getAuth(app)
    const navigate = useNavigate()
    const [{user, allSongs, song, isSongPlaying, miniPlayer}, dispatch] = useStateValue()
    const [isLoading, setIsLoading] = useState(false)

    const [auth, setAuth] = useState(
        window.localStorage.getItem("auth") === "true"
    )

    useEffect(() => {
        setIsLoading(true)
        firebaseAuth.onAuthStateChanged((userCred) => {
            if (userCred) {
                userCred.getIdToken().then((token) => {
                    // console.log(token)
                    window.localStorage.setItem("auth", "true")
                    validateUser(token).then((data) => {
                        dispatch({
                            type: actionType.SET_USER,
                            user: data,
                        })
                    })
                })
                setIsLoading(false)
            } else {
                setAuth(false)
                dispatch({
                    type: actionType.SET_USER,
                    user: null,
                })
                setIsLoading(false)
                window.localStorage.setItem("auth", "false")
                navigate("/login")
            }
        })
    }, [])

    useEffect(() => {
        if (!allSongs && user) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.data,
                })
            })
        }
    }, [])


    return (
        <AnimatePresence>
            <div className="h-auto flex items-center justify-center min-w-[680px]">
                {isLoading ||
                    (!user && (
                        <div className="fixed inset-0 bg-loaderOverlay backdrop-blur-sm ">
                            <Loader/>
                        </div>
                    ))}
                <Routes>
                    <Route path="/login" element={<Login setAuth={setAuth}/>}/>
                    <Route path="/*" element={<Home/>}/>
                    <Route path="/dashboard/*" element={<Dashboard/>}/>
                    <Route path="/userProfile" element={<UserProfile/>}/>
                    <Route path="/artist/detail" element={<ArtistsDetail/>}/>
                    <Route path="/album/detail" element={<AlbumDetail/>}/>
                </Routes>

                {isSongPlaying && (
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 50}}
                        className={`fixed min-w-[700px] h-26  inset-x-0 bottom-0  bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
                    >
                        <MusicPlayer/>
                    </motion.div>
                )}
            </div>
        </AnimatePresence>
    )
}

export default App
