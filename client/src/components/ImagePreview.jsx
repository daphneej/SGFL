import { useEffect, useState } from "react";
import axios from "axios";

const apiKey = "AIzaSyC7DrrjdntwfkEJ5Et5vf6TfoTAX8MhADs";
const accessToken =
  "ya29.a0AfB_byBm6y2RBmWWygHIYzyZX-d_iPTImMNwOLtPDAEQzi37Aqm8qtEtwc3mFZv6utRW7ymteFRhNQfV85tXetCEVcKzvpGvN6WgWZmgebby_7pkShSaSfHZ79zW1StRhwLOvtOP9DOw5Ic2MQaUXQsGUSzu4_mtkvYw7ujjaCgYKAfESARASFQHsvYlsFVqhdPoWTLGpMPyRBDHX0w0175";

const ImagePreview = ({ fileId }) => {
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    // Fetch the image content from Google Drive API
    axios
      .get(
        `https://www.googleapis.com/drive/v3/files/${fileId}?key=${apiKey} HTTP/1.1`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        const blob = new Blob([response.data], {
          type: response?.data?.mimeType,
        }); // Adjust the type as needed
        const objectURL = URL.createObjectURL(blob);
        setImageURL(objectURL);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, [fileId]);

  return (
    <div>
      {imageURL && (
        <img
          className="rounded-xl max-h-52 object-cover"
          src={imageURL}
          alt="Image Preview"
        />
      )}
    </div>
  );
};

export default ImagePreview;
