import React, { useEffect, useState } from 'react';

export default function PlaceImage({ place, className, alt }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  
  useEffect(() => {
    if (!place) return;

    const getPlacePhoto = async () => {
      try {
        const placeSearchResponse = await fetch(
          `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(place)}&inputtype=textquery&fields=photos,place_id&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`
        );
        
        const placeData = await placeSearchResponse.json();
        
        if (placeData.candidates?.[0]?.photos?.[0]?.photo_reference) {
          const photoReference = placeData.candidates[0].photos[0].photo_reference;
          const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`;
          setPhotoUrl(photoUrl);
        } else {
          setPhotoUrl('/asset/placeholder.jpg');
        }
      } catch (error) {
        console.error('Error fetching place photo:', error);
        setPhotoUrl('/asset/placeholder.jpg');
      }
    };

    getPlacePhoto();
  }, [place]);

  if (!photoUrl) {
    return <div style={{height: 200, background: "#f0f0f0"}} className={className}/>;
  }

  return <img src={photoUrl} alt={alt || place} className={className} />;
}