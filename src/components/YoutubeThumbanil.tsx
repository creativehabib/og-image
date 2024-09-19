import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";

const YoutubeThumbnailFetcher = () => {
    const [videoId, setVideoId] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [thumbnailQuality, setThumbnailQuality] = useState('default');
    const downloadRef = useRef(null);

    // Default thumbnail when no video ID is entered
    const defaultThumbnailUrl = 'https://via.placeholder.com/480x360?text=Default+Thumbnail';

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
        }else {
            // Show default thumbnail when no video ID is entered
            setThumbnailUrl(defaultThumbnailUrl);
        }
    }, [videoId, thumbnailQuality]);

    return (
        <div>
            <h2 className={'py-2 px-4 mb-4 bg-red-700 text-white'}>YouTube Video Thumbnail Download</h2>
            <div className={'flex mb-4'}>
                <Input
                    type={'text'}
                    value={videoId}
                    onChange={(e) => setVideoId(e.target.value)}
                    placeholder="Enter YouTube video ID"
                    className={'me-2'}
                />

                <Select value={thumbnailQuality} onValueChange={(value) => setThumbnailQuality(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Quality" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="maxres">Maxres</SelectItem>
                    </SelectContent>
                </Select>
            </div>


            <div>
                <img
                    src={thumbnailUrl}
                    alt="YouTube Video Thumbnail"
                    style={{width: '100%', height: '300px'}}
                />
                {thumbnailUrl !== defaultThumbnailUrl && (
                    <Button className={'w-full mt-4'} onClick={handleDownload}>Download Thumbnail</Button>
                )}

            </div>
        </div>
    );
};

export default YoutubeThumbnailFetcher;
