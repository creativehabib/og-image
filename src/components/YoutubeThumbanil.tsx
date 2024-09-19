import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const YoutubeThumbnailFetcher = () => {
    const [videoId, setVideoId] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [thumbnailQuality, setThumbnailQuality] = useState('default');
    const downloadRef = useRef(null);

    // Handle thumbnail download only on button click
    const handleDownload = async () => {
        try {
            if (!thumbnailUrl) {
                alert('No thumbnail available to download.');
                return;
            }
            const response = await fetch(thumbnailUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'youtube_thumbnail.jpg'; // Adjust the filename as needed
            link.click();

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading thumbnail:', error);
        }
    };

    const fetchThumbnail = async () => {
        if (!videoId) {
            return;
        }

        try {
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyB26suJJ5_nVnOQmluHMH7jeCwGETF7-30&part=snippet`
            );
            if (response.data.items.length === 0) {
                alert('No video found with the provided ID.');
                setThumbnailUrl('');
                return;
            }

            const thumbnailData = response.data.items[0].snippet.thumbnails;

            let chosenThumbnail;
            switch (thumbnailQuality) {
                case 'default':
                    chosenThumbnail = thumbnailData.default;
                    break;
                case 'medium':
                    chosenThumbnail = thumbnailData.medium;
                    break;
                case 'high':
                    chosenThumbnail = thumbnailData.high;
                    break;
                case 'standard':
                    chosenThumbnail = thumbnailData.standard;
                    break;
                case 'maxres':
                    chosenThumbnail = thumbnailData.maxres;
                    break;
                default:
                    chosenThumbnail = thumbnailData.default;
            }

            setThumbnailUrl(chosenThumbnail.url);
        } catch (error) {
            console.error('Error fetching thumbnail:', error);
        }
    };

    // Fetch thumbnail when videoId or thumbnailQuality changes
    useEffect(() => {
        if (videoId) {
            fetchThumbnail();
        }
    }, [videoId, thumbnailQuality]);

    return (
        <div>
            <input
                type="text"
                value={videoId}
                onChange={(e) => setVideoId(e.target.value)}
                placeholder="Enter YouTube video ID"
            />

            <select
                value={thumbnailQuality}
                onChange={(e) => setThumbnailQuality(e.target.value)}
            >
                <option value="default">Default</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="standard">Standard</option>
                <option value="maxres">Maxres</option>
            </select>

            {thumbnailUrl && (
                <div>
                    <img src={thumbnailUrl} alt="YouTube Video Thumbnail" />
                    <button onClick={handleDownload}>Download Thumbnail</button>
                </div>
            )}
        </div>
    );
};

export default YoutubeThumbnailFetcher;
