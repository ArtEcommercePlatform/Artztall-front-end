import React, { ChangeEvent, useState } from 'react';
import imageCompression from 'browser-image-compression';

interface ImageUploadProps {
    onImageSelect: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setIsLoading(true);

            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1500,
                useWebWorker: true,
            };

            try {
                const compressedFile = await imageCompression(file, options);

                if (compressedFile.size > 5 * 1024 * 1024) {
                    setError('Image size exceeded 5MB after compression.');
                    setIsLoading(false);
                    return;
                }

                const compressedImageUrl = URL.createObjectURL(compressedFile);
                setSelectedImage(compressedImageUrl);
                setError(null);
                onImageSelect(compressedFile);
            } catch (error) {
                console.error('Error compressing the image:', error);
                setError('Failed to compress image.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="mb-4 border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center">
            <label className="block text-sm font-medium text-[#094129] mb-2">
                {selectedImage ? 'Selected Image' : 'Upload an image'}
            </label>

            {isLoading ? (
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#094129] mb-2"></div>
            ) : selectedImage ? (
                <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-32 h-32 object-cover rounded-md mb-2"
                />
            ) : (
                <div className="flex flex-col items-center text-blue-500">
                    <span className="material-icons text-[#14AF6C]">upload</span>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
            />
            <label
                htmlFor="file-upload"
                className="text-[#14AF6C] cursor-pointer hover:underline"
            >
                {selectedImage ? 'Change image' : 'Select an image'}
            </label>

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
    );
};

export default ImageUpload;
