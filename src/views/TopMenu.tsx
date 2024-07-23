import React from 'react';
import {  NavLink  } from "react-router-dom"; 
import { useSelector } from 'react-redux';
import { AppState } from '../store';

const isActiveLink = (match : any ,location : any): boolean => {
      return (location.pathname === "/");
      }
export const TopMenu = () => {      
      const user = useSelector((state:AppState) => state.user);
      return (
            <div className="topmenu">
                  <NavLink isActive={(match : any ,location : any): boolean => {
                                          return (location.pathname === "/") || !(match === null);
                                      }} 
                        to="/recent" className="topmenu-item" activeClassName="topmenu-item-selected">
                        Recent Test Logs
                  </NavLink>
                  <NavLink isActive={(match : any ,location : any): boolean => {
                                           return !(match === null);
                                     }} 
                        to="/uploadFile" className="topmenu-item" activeClassName="topmenu-item-selected">
                        Upload File
                  </NavLink>
                  {user && <NavLink isActive={(match : any ,location : any): boolean => {
                                          return !(match === null);
                                    }} 
                        to={"/curUserWork/"+user.userId} className="topmenu-item" activeClassName="topmenu-item-selected">
                        My Work
                  </NavLink>}
                  <NavLink isActive={(match : any ,location : any): boolean => {
                                           return !(match === null);
                                     }} 
                        to="/queryTestCases" className="topmenu-item" activeClassName="topmenu-item-selected">
                        Search for Test Cases
                  </NavLink>
            {/* 
                  menuItems.map((item, index) => (
                    <NavLink isActive= {(match : any ,location : any): boolean => {
                           return ((location.pathname === "/") && (index === 0)) ?
                                true : !(match === null);
                           }} 
                        to={item.itemUrl} className="topmenu-item" activeClassName="topmenu-item-selected">{item.itemTitle}</NavLink>
                  ))
            */}
            </div>      
  )
}