import { createContext, useContext, useState } from "react";


const PopupContext = createContext();

export function useProfilePopupContext(){
    return useContext(PopupContext)
}

export function PopupContexProvider({children}){
    const [profilePopup, setProfilePopup] = useState(false);

    function showProfilePopup(){
        setProfilePopup(true);
    }

    function turnProfilePopup(){
        setProfilePopup(false);
    }

    return(
        <PopupContext.Provider value={{profilePopup, showProfilePopup, turnProfilePopup }}>
            {children}
        </PopupContext.Provider>
    )
}