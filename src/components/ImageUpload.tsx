'use client';  // Ensure this component runs on the client side

import { useState } from 'react';
import { Input } from './ui/input';

// Define the type for the file upload event
interface FileUploadEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}

export default function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<string | null>(null);  // For original image size
  const [newSize, setNewSize] = useState<string | null>(null);            // For compressed image size
  const [compressedImageName, setCompressedImageName] = useState<string>('compressed-image.jpg'); // Set default download file name

  // Handle the image upload
  const handleImageUpload = (e: FileUploadEvent) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      // Convert file size to KB
      const fileSizeInKB = (file.size / 1024).toFixed(2);
      setOriginalSize(`${fileSizeInKB} KB`);  // Store original image size

      // Set file name for the compressed image
      setCompressedImageName(`compressed-${file.name}`);

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);  // Set the uploaded image to state
      };
    }
  };

  // Handle image compression
  const handleImageCompression = () => {
    if (!selectedImage) return;

    const image = new Image();
    image.src = selectedImage;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

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
      const byteSize = byteString.length / 1024; // Convert to KB

      setCompressedImage(compressedDataUrl);
      setNewSize(byteSize.toFixed(2) + ' KB');  // Store compressed image size
    };
  };

  return (
    <div className="max-w-6xl mx-auto md:grid md:grid-cols-2 md:gap-6 md:space-y-0 space-y-6 px-4 py-12">
      {/* Upload and Compress Section */}
      <div className="bg-card p-6 rounded-lg border shadow-md">
        <h1 className="text-2xl font-bold mb-4">Upload and Compress Image</h1>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />

        {selectedImage && (
          <div>
            <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
            <p>Original Size: {originalSize}</p> {/* Display original image size */}
          </div>
        )}

        <button onClick={handleImageCompression} disabled={!selectedImage} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Compress Image
        </button>
      </div>

      {/* Compressed Image Section */}
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
                className="mt-4 inline-block"
              >
                <button className="bg-green-500 text-white px-4 py-2 rounded">
                  Download Compressed Image
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
