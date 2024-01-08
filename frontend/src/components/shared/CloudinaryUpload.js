import { openUploadWidget } from "../utils/CloudinaryService";
import { cloudinary_upload_preset } from "../../config";

// CloudinaryUpload component receives setUrl and setName as props to update image URL and name
const CloudinaryUpload = ({ setUrl, setName }) => {
    // Function to open the Cloudinary upload widget
    const uploadImageWidget = () => {
        // Call openUploadWidget function from CloudinaryService with configuration parameters
        let myUploadWidget = openUploadWidget(
            {
                cloudName: "dtdfdhwj2",  // Cloudinary cloud name
                uploadPreset: cloudinary_upload_preset,  // Cloudinary upload preset
                sources: ["local"],  // Allow local file upload as the image source
            },
            function (error, result) {
                if (!error && result.event === "success") {
                    // console.log(result.info);                  
                    // Update the state with the secure URL and original filename
                    setUrl(result.info.secure_url);
                    setName(result.info.original_filename);
                } else {
                    if (error) {
                        console.log(error);
                    }
                }
            }
        );
        
        // Open the Cloudinary upload widget
        myUploadWidget.open();
    };

    // Render a button that triggers the uploadImageWidget function on click
    return (
        <button className="btn btn-light rounded-pill mx-4" style={{fontWeight: "500", padding: "12px"}} onClick={uploadImageWidget}>
            Select Track
        </button>
    );
};

export default CloudinaryUpload;
