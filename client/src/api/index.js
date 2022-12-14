import axios from "axios"

// const baseURL = "http://localhost:4000/"
const baseURL = "http://35.86.218.229:4000/"
// const baseURL = "http://172.31.63.95:4000/"

export const validateUser = async (token) => {
    try {
        const res = await axios.get(`${baseURL}api/users/login`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return res.data
    } catch (error) {
        return null
    }
}

export const getAllSongs = async () => {
    try {
        const res = await axios.get(`${baseURL}api/songs/getAll`)
        return res.data
    } catch (error) {
        return null
    }
}

export const getAllSongsForArtist = async (artist) => {
    try {
        const res = await axios.get(`${baseURL}api/songs/artist`, {
            params: {artist: artist}
        })
        return res.data
    } catch (error) {
        return null
    }
}

export const getAllSongsForAlbum = async (album) => {
    try {
        const res = await axios.get(`${baseURL}api/songs/album`, {
            params: {album: album}
        })
        return res.data
    } catch (error) {
        return null
    }
}

export const saveNewSong = async (data) => {
    try {
        const res = axios.post(`${baseURL}api/songs/save`, {...data})
        return (await res).data.song
    } catch (error) {
        return null
    }
}

export const getAllArtist = async () => {
    try {
        const res = await axios.get(`${baseURL}api/artists/getAll`)
        return res.data
    } catch (error) {
        return null
    }
}

export const saveNewArtist = async (data) => {
    try {
        const res = axios.post(`${baseURL}api/artists/save`, {...data})
        return (await res).data.artist
    } catch (error) {
        return null
    }
}

export const getAllAlbums = async () => {
    try {
        const res = await axios.get(`${baseURL}api/albums/getAll`)
        return res.data
    } catch (error) {
        return null
    }
}


export const saveNewAlbum = async (data) => {
    try {
        const res = axios.post(`${baseURL}api/albums/save`, {...data})
        return (await res).data.album
    } catch (error) {
        return null
    }
}



