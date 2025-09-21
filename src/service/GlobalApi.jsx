import axios from "axios"

const BASE_URL='https://places.googleapis.com/v1/places:searchText'

const config={
    headers:{
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': [
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

// Enhanced config for detailed place information including location
const detailedConfig={
    headers:{
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
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
}

export const GetPlaceDetails=(data)=>axios.post(BASE_URL,data,config)

// New function to get detailed place information with location
export const GetDetailedPlaceInfo = (placeName) => {
    const data = {
        textQuery: placeName,
        maxResultCount: 1
    }
    return axios.post(BASE_URL, data, detailedConfig)
}

export const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1900&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY