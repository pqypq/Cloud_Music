import React, {useContext, useReducer} from "react"

const {Provider, Consumer} = React.createContext()
export const StateContext = React.createContext()

export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext)
