import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoggedInNavbar from '../components/shared/LoggedInNavbar';
import Sidebar from '../components/shared/sideBar';
import Input from '../components/shared/Input';
import CloudinaryUpload from '../components/shared/CloudinaryUpload';
import { makeAuthPostReq } from '../components/utils/serverHelper';
import LoggedInContainer from '../containers/LoggedInContainer';

export default function UploadSong(){
        const navigate = useNavigate();
    // console.log(window)
    // console.log(window.cloudinary)
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [playlistUrl, setPlaylistUrl] = useState("");
    const [uploadedSongFileName, setUploadedFileSongName] = useState("");

    const submitSong = async () => {
        const data = { name, thumbnail, track: playlistUrl };
        const response = await makeAuthPostReq('/song/createSong', data);
        console.log(response);
        if (response.err) {
            alert("Failed to upload the song!");
            return;
        }
        alert("Song uploaded successfully.");
        navigate("/");
    }
    return (
        <LoggedInContainer>
            <div className='text-white m-4 fs-3 fw-bold'>Upload Your Music</div>
                <div className='d-flex m-4 text-white w-75'>
                    <Input label="Name" placeholder="Name" type="text" value={name} setValue={setName} />
                    <Input label="Thumbnail" placeholder="Thumbnail" type="text" value={thumbnail} setValue={setThumbnail} />
                </div>
                <div>
                    {
                        uploadedSongFileName ? <div className='bg-white p-2 m-4 rounded'>{uploadedSongFileName}</div> :
                            <CloudinaryUpload setUrl={setPlaylistUrl} setName={setUploadedFileSongName} />
                    }

                </div>
                <div className='w-75 text-center'>
                    <button className="btn btn-light rounded-pill m-4 w-25" style={{ fontWeight: "500", padding: "13px" }} onClick={submitSong}>Submit Song</button>
                </div>
        </LoggedInContainer>
    )
}
// export default function UploadSong() {
//     const navigate = useNavigate();
//     // console.log(window)
//     // console.log(window.cloudinary)
//     const [name, setName] = useState("");
//     const [thumbnail, setThumbnail] = useState("");
//     const [playlistUrl, setPlaylistUrl] = useState("");
//     const [uploadedSongFileName, setUploadedFileSongName] = useState("");

//     const submitSong = async () => {
//         const data = { name, thumbnail, track: playlistUrl };
//         const response = await makeAuthPostReq('/song/createSong', data);
//         console.log(response);
//         if (response.err) {
//             alert("Failed to upload the song!");
//             return;
//         }
//         alert("Song uploaded successfully.");
//         navigate("/");
//     }

//     return (
//         <div className='h-100 w-100 d-flex .font-poppins position-relative'>
//             <div className='w-25 d-flex-col' style={{ backgroundColor: "#1c1c1c" }}>
//                 <Sidebar />
//             </div>
//             <div className='w-75 overflow-auto' style={{ backgroundColor: "#1b1919" }}>
//                 <LoggedInNavbar />
//                 <div className='text-white m-4 fs-3 fw-bold'>Upload Your Music</div>
//                 <div className='d-flex m-4 text-white w-75'>
//                     <Input label="Name" placeholder="Name" type="text" value={name} setValue={setName} />
//                     <Input label="Thumbnail" placeholder="Thumbnail" type="text" value={thumbnail} setValue={setThumbnail} />
//                 </div>
//                 <div>
//                     {
//                         uploadedSongFileName ? <div className='bg-white p-2 m-4 rounded'>{uploadedSongFileName}</div> :
//                             <CloudinaryUpload setUrl={setPlaylistUrl} setName={setUploadedFileSongName} />
//                     }

//                 </div>
//                 <div className='w-75 text-center'>
//                     <button className="btn btn-light rounded-pill m-4 w-25" style={{ fontWeight: "500", padding: "13px" }} onClick={submitSong}>Submit Song</button>
//                 </div>
//             </div>
//         </div>
//     )
// }
