"use client"
import { useState } from 'react';
import { Input } from './ui/input';

export default function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [originalSize, setOriginalSize] = useState(null);  // For original image size
  const [newSize, setNewSize] = useState(null);            // For compressed image size
  const [compressedImageName, setCompressedImageName] = useState('compressed-image.jpg'); // Set default download file name

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      // Convert file size to KB
      const fileSizeInKB = (file.size / 1024).toFixed(2);
      setOriginalSize(`${fileSizeInKB} KB`);  // Store original image size

      // Set file name for the compressed image
      setCompressedImageName(`compressed-${file.name}`);

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedImage(reader.result);  // Set the uploaded image to state
      };
    }
  };

  const handleImageCompression = () => {
    if (!selectedImage) return;

    const image = new Image();
    image.src = selectedImage;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const width = image.width;
      const height = image.height;

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw the image on the canvas
      ctx.drawImage(image, 0, 0, width, height);

      // Compress the image by changing the quality (0.5 = 50% quality)
      const quality = 0.5;
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

      // Get the new file size
      const byteString = atob(compressedDataUrl.split(',')[1]);
      const byteSize = byteString.length / 1024; // convert to KB

      setCompressedImage(compressedDataUrl);
      setNewSize(byteSize.toFixed(2) + ' KB');  // Store compressed image size
    };
  };

  return (
    <div className="max-w-6xl mx-auto md:grid md:grid-cols-2 md:gap-6 md:space-y-0 space-y-6 px-4 py-12">
      <div className="bg-card p-6 rounded-lg border shadow-md">
      <h1 className="text-2xl font-bold mb-4">Upload and Compress Image</h1>
      <Input type='file' accept='image/' onChange={handleImageUpload}/>
      
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
          <p>Original Size: {originalSize}</p> {/* Display original image size */}
        </div>
      )}

      <button onClick={handleImageCompression} disabled={!selectedImage}>
        Compress Image
      </button>
</div>
<div className="bg-card p-6 rounded-lg border shadow-md">
        <div className="bg-muted rounded-lg overflow-hidden">
      {compressedImage && (
        <div>
          <img src={compressedImage} alt="Compressed" style={{ maxWidth: '100%', height: 'auto' }} />
          <p>New Size: {newSize}</p> {/* Display compressed image size */}
          
          {/* Download button */}
          <a
            href={compressedImage}
            download={compressedImageName}  // Set the name of the downloaded file
            style={{ marginTop: '10px', display: 'inline-block' }}
          >
            <button>Download Compressed Image</button>
          </a>
        </div>
    
      )}
      </div>
      </div>
    </div>
  );
}
