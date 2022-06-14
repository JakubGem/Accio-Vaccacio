import React from "react"
import './UserLeftBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaPencilAlt, FaMapMarked, FaHeart, FaPhotoVideo, FaBuromobelexperte } from 'react-icons/fa' ;

const UserLeftBar = () => {
    return (
        <div className="App">
            <header>
                <ProSidebar className="sidebar" style={{height: "1000px"}}>
                    <Menu iconShape="square">
                        <MenuItem icon={<FaPencilAlt />}>Notes</MenuItem>
                        <MenuItem icon={<FaMapMarked />}>Places i want to go</MenuItem>
                        <MenuItem icon={<FaBuromobelexperte />}>Calculator</MenuItem>
                        <MenuItem icon={<FaPhotoVideo />}>Albums from trips</MenuItem>
                        <MenuItem icon={<FaHeart />}>Favourite comments in forum</MenuItem>
                    </Menu>
                </ProSidebar>
            </header>
        </div>
    );
}

export default UserLeftBar;