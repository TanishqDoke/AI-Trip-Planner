import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
const TEXT_SEARCH_BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

const baseConfig = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
    }
};

const simpleConfig = {
    ...baseConfig,
    headers: {
        ...baseConfig.headers,
        'X-Goog-FieldMask': ['places.displayName', 'places.id']
    }
};

const detailedConfig = {
    ...baseConfig,
    headers: {
        ...baseConfig.headers,
        'X-Goog-FieldMask': [
            'places.photos',
            'places.displayName',
            'places.id',
            'places.formattedAddress',
            'places.location',
            'places.rating',
            'places.userRatingCount',
            'places.websiteUri',
            'places.googleMapsUri'
        ]
    }
};

// Legacy function restored for components that require it.
export const GetPlaceDetails = (data) => axios.post(TEXT_SEARCH_BASE_URL, data, simpleConfig);

// Main function for fetching rich place details.
export const GetDetailedPlaceInfo = (textQuery) => {
    const data = {
        textQuery: textQuery,
        maxResultCount: 1
    };
    return axios.post(TEXT_SEARCH_BASE_URL, data, detailedConfig);
};

// Legacy constant, kept for any components that might still use it.
export const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1900&key=${API_KEY}`;

// Preferred function for constructing a photo URL.
export const buildPhotoUrl = (photoName) => {
    if (!photoName) return null;
    return `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=1000&maxWidthPx=1900&key=${API_KEY}`;
};

