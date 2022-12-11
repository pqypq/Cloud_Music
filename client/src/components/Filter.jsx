import React, {useEffect} from "react"
import {actionType} from "../Context/reducer"
import {useStateValue} from "../Context/StateProvider"
import {getAllAlbums, getAllArtist} from "../api"
import {filterByLanguage, filters} from "../utils/supportfunctions"
import FilterButtons from "./FilterButtons"

const Filter = ({setFilteredSongs}) => {
    const [{filterTerm, artists, allAlbums}, dispatch] = useStateValue()

    useEffect(() => {
        if (!artists) {
            getAllArtist().then((data) => {
                dispatch({type: actionType.SET_ARTISTS, artists: data.data})
            })
        }

        if (!allAlbums) {
            getAllAlbums().then((data) => {
                dispatch({type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data})
            })
        }
    }, [])

    return (
        <div className="w-full my-4 px-6 py-4 flex items-center justify-start md:justify-center gap-10">
            
            <FilterButtons filterData={artists} flag={"Artist"}/>

            <FilterButtons filterData={filters} flag={"Category"}/>

            <FilterButtons filterData={allAlbums} flag={"Albums"}/>

            <FilterButtons filterData={filterByLanguage} flag={"Language"}/>

        </div>
    )
}

export default Filter
