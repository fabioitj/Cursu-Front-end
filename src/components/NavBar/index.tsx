import React, { useState, useEffect } from "react";
import Curso from "../../models/Curso/Curso";
import "./style.scss";
import SideBar from "../SideBar";

function NavBar() {
    const logo = require("../../assets/images/logo.png");
    const windowWidth = window.innerWidth;

    return (
        <div className="navbar">
            <div className="navbar-box">
                <div className="navbar-box-item navbar-box-sidebar">
                    {
                        windowWidth >= 1440 ? (
                            <div>

                            </div>
                        ) : (
                            <SideBar />
                        )
                    }
                    
                </div>
                <div className="navbar-box-item">
                    <img
                        className="navbar-logo"
                        src={logo}
                        width={30}
                        height={30}
                    />
                </div>
            </div>
        </div>
    );
}

export default NavBar;
