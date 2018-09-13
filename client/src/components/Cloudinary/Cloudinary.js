import React from "react";
import cloudinary from "cloudinary";
import Dropzone from "react-dropzone";
import axios from "axios";

class Cloudinary extends Components {
    handleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append("upload_preset", "pvhilzh7"); // Replace the preset name with your own
            formData.append("api_key", "782769678216731"); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
            return axios.post("https://api.cloudinary.com/v1_1/codeinfuse/image/upload", formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                const fileURL = data.secure_url // You should store this URL for future references in your app
                console.log(data);
            })
        });

        // Once all the files are uploaded 
        axios.all(uploaders).then(() => {
            // ... perform after upload is successful operation
        });
    }

    render() {
        return (
            <Dropzone
                onDrop={this.handleDrop}
                multiple
                accept="image/*"
                style={styles.dropzone}
            >
                <p>Drop your files or click here to upload</p>
            </Dropzone>
        )
    }
}

export default Cloudinary