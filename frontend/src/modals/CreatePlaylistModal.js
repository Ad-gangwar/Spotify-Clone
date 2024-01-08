import React, { useState } from 'react'
import Input from '../components/shared/Input';
import { makeAuthPostReq } from '../components/utils/serverHelper';

export default function CreatePlaylistModal({ closeModal }) {
    const [playlistName, setPlaylistName] = useState("");
    const [playlistThumbnail, setPlaylistThumbnail] = useState("");

    const createPlaylist = async () => {
        const response = await makeAuthPostReq(
            "/playlist/create",
            { name: playlistName, thumbnail: playlistThumbnail, songs: []}
        );
        console.log(response);
        if (response._id) {
            alert('Playlist created successfully!');
            closeModal();
        }
    };

    return (
        <div className="custom-modal bg-opacity-10">
        <div className="custom-modal-dialog">
            <div className="custom-modal-content">
                <div className="custom-modal-header bg-dark d-flex justify-content-between">
                    <h5 className="modal-title text-white fw-bold">Create Playlist</h5>
                    <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="custom-modal-body" style={{ backgroundColor: "#474848" }}>
                    <form>
                        <Input
                            label="Name"
                            labelClassName={"text-white"}
                            placeholder="Playlist Name"
                            value={playlistName}
                            setValue={setPlaylistName}
                        />
                        <Input
                            label="Thumbnail"
                            labelClassName={"text-white"}
                            placeholder="Thumbnail"
                            value={playlistThumbnail}
                            setValue={setPlaylistThumbnail}
                        />
                    </form>
                </div>
                <div className="custom-modal-footer bg-dark d-flex flex-row-reverse">
                    <button type="button" className="btn btn-outline-light mx-2" onClick={createPlaylist}>Create</button>
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    </div>
    
    )
}

