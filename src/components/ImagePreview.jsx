import { useState } from "react";

const ImagePreview = ({ file }) => {
  const [preview, setPreview] = useState(null);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };

  return preview ? (
    <img
      src={preview}
      alt=""
      className="block mt-2 img-thumbnail"
      width={200}
    />
  ) : (
    <p>Loading...</p>
  );
};

export default ImagePreview;
