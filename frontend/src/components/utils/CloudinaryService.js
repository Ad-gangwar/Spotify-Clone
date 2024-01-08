import {Cloudinary as CoreCloudinary, Util} from "cloudinary-core";

// Function to generate a Cloudinary URL for a given public ID and options
export const url = (publicId, options) => {
    try {
        // Convert options keys to snake_case using Util.withSnakeCaseKeys
        const scOptions = Util.withSnakeCaseKeys(options);
        
        // Create a new Cloudinary instance using CoreCloudinary
        const cl = CoreCloudinary.new();
        
        // Generate and return the Cloudinary URL based on the public ID and options
        return cl.url(publicId, scOptions);
    } catch (e) {
        console.error(e);
        return null;
    }
};

// Function to open the Cloudinary upload widget with specified options and callback
export const openUploadWidget = (options, callback) => {
    // Use the window.cloudinary object to open the Cloudinary upload widget
    return window.cloudinary.openUploadWidget(options, callback);
};
