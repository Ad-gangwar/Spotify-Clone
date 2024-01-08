import React from 'react'
import { Link , useNavigate} from 'react-router-dom';
import { Icon } from '@iconify/react';


export default function Navbar() {
    let navigate=useNavigate();

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
                                <Link className='text-decoration-none nav-link' to="/signup">Sign up</Link>
                                <button type="submit" className="btn rounded-pill text-dark bg-white fw-bold mx-3" onClick={()=>{
                                    navigate("/login");
                                }}>Log in</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
