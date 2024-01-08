import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react';
import { useCookies } from "react-cookie";

export default function LoggedInNavbar() {
    let navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const handleLogout = () => {
        // Remove the authentication token cookie
        removeCookie("token");
        navigate("/login");
    }

    return (
        <div className='sticky-top'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark iconText">
                <div className="container-fluid ">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-between">
                        <div className='d-flex'>
                            <div className='rounded-circle mx-3 p-1' style={{ backgroundColor: "#242020" }}><Icon icon="icon-park-outline:left" text="" color='white' width={30} /></div>
                            <div className='rounded-circle p-1' style={{ backgroundColor: "#242020" }}><Icon icon="icon-park-outline:right" text="" color='white' width={30} /></div>
                        </div>
                        <div className='d-flex'>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="#">Premium</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="#">Support</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="#">Download</Link>
                                </li>
                                <div className='border border-white my-1 mx-5'></div>
                            </ul>
                            <div className='d-flex align-items-center navbar-nav'>
                                <Link className='text-decoration-none nav-link' to="/uploadSong">Upload Song</Link>
                                <button className="rounded-circle mx-2 p-1" onClick={() => {
                                    navigate("/myProfile");
                                }}><Icon icon="line-md:account" text=""  width={33} /></button>
                                <button type="submit" className="btn rounded-pill text-dark bg-white fw-bold mx-2" onClick={handleLogout}>Log Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
