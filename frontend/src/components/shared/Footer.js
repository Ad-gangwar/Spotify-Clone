import React from 'react'
import {Link} from 'react-router-dom';
import logo from '../../assets/images/spotify_logo_white.svg';

export default function Footer() {
    return (
        <div className="bg-dark">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 ">
                <p className="col-md-4 mb-0 text-white px-3">© 2006 Company, Inc</p>

                <Link to="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <img src={logo} className="bi me-2" width="100" height="32"></img>
                </Link>

                <ul className="nav col-md-4 justify-content-end px-3">
                    <li className="nav-item"><Link to="/" className="nav-link px-2   text-white">Home</Link></li>
                    <li className="nav-item"><Link to="#" className="nav-link px-2  text-white">Features</Link></li>
                    <li className="nav-item"><Link to="#" className="nav-link px-2  text-white">FAQs</Link></li>
                    <li className="nav-item"><Link to="#" className="nav-link px-2  text-white">About</Link></li>
                </ul>
            </footer>
        </div>
    )
}
