import { useState, useEffect } from "react";
import { makeAuthGetReq } from "../components/utils/serverHelper";


export default function AddToPlaylistModal({ closeModal, addSongToPlaylist}) {

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
        <div className="custom-modal bg-opacity-10">
            <div className="custom-modal-dialog">
                <div className="custom-modal-content">
                    <div className="custom-modal-header d-flex justify-content-between bg-dark">
                        <h4 className="modal-title text-white fw-bold px-2">Add Song to Playlist</h4>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="custom-modal-body" style={{backgroundColor: "#0f0f0fde"}}>
                        <h5 className="text-white iconText">Select Playlist</h5>
                        <div>
                            {myPlaylists.map((item) => {
                                return (
                                    <PlaylistListComponent
                                        info={item}
                                        addSongToPlaylist={addSongToPlaylist}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="custom-modal-footer bg-dark d-flex flex-row-reverse" >
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

const PlaylistListComponent = ({ info, addSongToPlaylist }) => {
    return (
        <div className="w-100 d-flex align-items-center my-3 cursor-pointer p-2 playlist-box rounded" onClick={() => {
            addSongToPlaylist(info._id)
        }} style={{backgroundColor: "#515151f2"}}>
            <div>
                <img
                    height="50rem"
                    width="50rem"
                    src={info.thumbnail}
                    className="rounded"
                    alt="thumbnail"
                />
            </div>
            <div className="text-white iconText mx-3">{info.name}</div>
        </div>
    );
};