import React from 'react'
import LoggedInContainer from '../containers/LoggedInContainer'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeAuthGetReq } from '../components/utils/serverHelper';

export default function Library() {
    
    const [myPlaylists, setMyPlaylists] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthGetReq(
                "/playlist/get/me"
            );
            setMyPlaylists(response.data);
        };
        getData();
    }, []);


    return (
        <LoggedInContainer currActiveScreen='library'>
            <h3 className='text-white m-4'>My Playlists</h3>
            <div className="py-2 d-grid container">
                <div className="row">
                    {myPlaylists.map((item) => {
                        return (
                            <div className='col col-lg-3 col-md-4 col-sm-6 m-2' key={item._id}>
                                <Card
                                    title={item.name}
                                    description=""
                                    imgUrl={item.thumbnail}
                                    playlistId={item._id}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </LoggedInContainer>
    )
}

const Card = ({ title, description, imgUrl, playlistId }) => {
    let navigate = useNavigate();
    return (
        <div className="card cursor-pointer mobile-card" style={{ maxWidth: "14rem", height: "16rem", backgroundColor: "#272525" }}
            onClick={() => {
                navigate("/playlist/" + playlistId);
            }}>
            <img src={imgUrl} className="card-img-top p-3 pb-1" alt="..." style={{ maxHeight: "11.5rem" }} />
            <div className="card-body">
                <div className="card-title text-light iconText fs-5">{title.length >= 19 ? title.slice(0, 17) + ".." : title}</div>
                <p className="card-text" style={{ color: "#b0afaf", fontSize: "0.9rem" }}>
                    {description.length >= 45 ? description.slice(0, 45) + ".." : description}
                </p>
            </div>
        </div>
    )
}
