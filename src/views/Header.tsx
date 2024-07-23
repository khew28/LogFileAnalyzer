import React from 'react';
import Logo from '../icons/logo.png';
import UserLogin from '../icons/login.png'
import UserLogout from '../icons/logout.png'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { AppState } from '../store';
import { useHistory } from "react-router-dom";

export const Header = () => {
    const currentUser = useSelector((state:AppState) => state.user);
    const [toolTipText, setToolTipText] = useState<string>("");
    const history = useHistory();
    const onClickUserIcon = () => {
        if (currentUser) {
            history.push("/logout");
        }
        else {
            history.push("/loginRegister");
        }
    }    

    useEffect(()=> {
        if (currentUser) {
            setToolTipText("Logout");
        } 
        else {
            setToolTipText("Login");
        }
    },[currentUser])
    
    console.log("Header(): user is", currentUser);
    return (
        <div className="header"> 
            <div className="header-logo"> 
                <img alt="" src={Logo} height="30px"/>
                
            </div>    
            <div className="header-text">  
                <div className="header-user-icon">
                {currentUser ? 
                    <img alt="" onClick={onClickUserIcon} src={UserLogout} height="30px"/>  :
                    <img alt="" onClick={onClickUserIcon} src={UserLogin} height="30px"/>
                }
                <span className="header-user-icon-tooltip">{toolTipText}</span>
                </div>
                Data Team Testing v1.027
            </div>   
        </div>
    )
}