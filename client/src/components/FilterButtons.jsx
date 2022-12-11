import React, {Component, useState} from "react"
import {IoChevronDown} from "react-icons/io5"

import {motion} from "framer-motion"
import {useStateValue} from "../Context/StateProvider"
import {actionType} from "../Context/reducer"
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const FilterButtons = ({filterData, flag}) => {
    const [selectName, setSelectName] = useState(flag)

    const [{artistFilter, albumFilter, filterTerm}, dispatch] = useStateValue()

    const updateFilterButton = (name) => {

        if (flag === "Artist") {
            dispatch({type: actionType.SET_ARTIST_FILTER, artistFilter: name})
        }
        if (flag === "Language") {
            dispatch({type: actionType.SET_LANGUAGE_FILTER, languageFilter: name})
        }

        if (flag === "Albums") {
            dispatch({type: actionType.SET_ALBUM_FILTER, albumFilter: name})
        }

        if (flag === "Category") {
            dispatch({type: actionType.SET_CATEGORY_FILTER, categoryFilter: name})
        }
    }

    const handleChange = (event) => {
        setSelectName(event.target.value)
        updateFilterButton(event.target.value)
    }

    return (
        <Box sx={{minWidth: 120}}>
            <FormControl sx={{m: 1, minWidth: 150}}>
                <Select
                    value={selectName}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{'aria-label': 'Without label'}}
                >
                    <MenuItem value={flag}>{flag}</MenuItem>
                    {filterData?.map((data, i) => (
                        <MenuItem value={data.name} key={i}>
                            <span style={{display: "inline-block", marginRight: 10}}>
                                {(flag === "Artist" || flag === "Albums") && (
                                    <img
                                        src={data.imageURL}
                                        className="w-8 min-w-[32px] h-8 rounded-full object-cover"
                                        alt=""
                                    />
                                )}
                            </span>
                            <span style={{display: "inline-block", verticalAlign: "top"}}>
                                {data.name.length > 15 ? `${data.name.slice(0, 14)}...` : data.name}
                            </span>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default FilterButtons


// <div className="border border-gray-300 rounded-md px-4 py-1 relative cursor-pointer hover:border-gray-400">
//     <p
//         className="text-base tracking-wide text-textColor flex items-center gap-2 "
//         onClick={() => setFilterMenu(!filterMenu)}
//     >
//         {!filterName && flag}
//         {filterName && (
//             <>
//                 {filterName.length > 15 ? `${filterName.slice(0, 14)}...` : filterName}
//             </>
//         )}
//         <IoChevronDown
//             className={`text-base text-textColor duration-150 transition-all ease-in-out ${
//                 filterMenu ? "rotate-180" : "rotate-0"
//             }`}
//         />
//     </p>
//
//     {filterData && filterMenu && (
//         <motion.div
//             initial={{opacity: 0, y: 50}}
//             animate={{opacity: 1, y: 0}}
//             exit={{opacity: 0, y: 50}}
//             className="w-48 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 py-2 flex flex-col rounded-md shadow-md absolute top-8 left-0"
//         >
//             {filterData?.map((data) => (
//                 <div
//                     key={data.name}
//                     className="flex items-center gap-2 px-4 py-1 hover:bg-gray-200"
//                     onClick={() => updateFilterButton(data.name)}
//                 >
//                     {(flag === "Artist" || flag === "Albums") && (
//                         <img
//                             src={data.imageURL}
//                             className="w-8 min-w-[32px] h-8 rounded-full object-cover"
//                             alt=""
//                         />
//                     )}
//                     <p className="w-full">
//                         {data.name.length > 15 ? `${data.name.slice(0, 14)}...` : data.name}
//                     </p>
//                 </div>
// {/*            ))}*/}
// {/*        </motion.div>*/}
// {/*    )}*/}
// {/*</div>*/}