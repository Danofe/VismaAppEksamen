import React, {useContext} from 'react'

const autentContext = React.createContext()

export function FirebaseAuth ({children,value}) {
    return(
        <autentContext.Provider value = {value}>
            {children}
        </autentContext.Provider>
    )
}
export function useAuthValue() {
    return useContext(autentContext)
}