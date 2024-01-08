import React, { useState, useEffect } from 'react';
import Footer from './shared/Footer';
import LoggedInContainer from '../containers/LoggedInContainer';
import { Icon } from '@iconify/react';
import { useCookies } from "react-cookie";
import { makeAuthPostReq } from './utils/serverHelper';

export default function MyProfile() {
    const [cookies] = useCookies(["userEmail"]);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await makeAuthPostReq("/auth/find/user", { email: cookies.userEmail });
                setUserData(response.data);
                
            } catch (error) {
                console.log("Error:", error);
            }
        };        
        getData();
    }, []);
   
    return (
        <LoggedInContainer>
            <div className='container mt-5' style={{ height: "75vh" }}>
                <div className='row p-5'>
                    {/* Left Column */}
                    <div className='col-lg-4 col-md-12 col-sm-12 text-center'>
                        <Icon icon='ic:baseline-account-circle' color='white' width={150} />
                    </div>

                    {/* Right Column */}
                    <div className='col-lg-8 col-sm-12 col-md-12'>
                        <div className='mb-4'>
                            <h1 className='text-white fw-bold fst-italic'>{userData.username}</h1>
                        </div>
                        <div className='mb-4'>
                            <h5 className='text-white d-inline-block fs-5'>Name:</h5>
                            <span className='text-white d-inline-block mx-3 fs-4 iconText'>{userData.firstName} {userData.lastName}</span>
                        </div>
                        <div className='mb-4'>
                            <h5 className='text-white d-inline-block fs-5'>Email:</h5>
                            <p className='text-white d-inline-block mx-3 iconText fs-4'>{userData.email}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: "10%" }}>
                <Footer />
            </div>
        </LoggedInContainer>
    );
}
