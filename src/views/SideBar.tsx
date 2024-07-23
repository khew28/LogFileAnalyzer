import React from 'react';
import {
    NavLink,
  } from "react-router-dom"; 

 interface SideBarProps {
     path: string;
     path2: string;
 } 
export const SideBar = ({path, path2}: SideBarProps) => {
    return (
        <div className="sidebar">
            <NavLink to={path}>Status</NavLink>
            <NavLink to={path2}>Upload File</NavLink>
        </div>
    )
}