import { db } from '@/service/firebaseConfig';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection'; // adjust relative path as needed
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import ShareItinerary from '../../my-trips/components/ShareItinerary'; // adjust path as needed

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        tripId && GetTripData()
    }, [tripId])

    // used to get trip info from firebase
    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            setTrip(docSnap.data());
        }
        else {
            toast("No trip found")
        }
    }

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Sharing UI at the top */}
            {trip &&
                <ShareItinerary tripId={tripId} title={trip?.userSelection?.location?.label || trip?.title || "My Itinerary"} />
            }

            {trip ? (
                <>
                    {/* Information Section */}
                    <InfoSection trip={trip} />

                    {/* Recommended Hotels */}
                    <Hotels trip={trip} />

                    {/* Daily Plan */}
                    <PlacesToVisit trip={trip} />

                    {/* Footer */}
                    <Footer trip={trip} />
                </>
            ) : (
                <p>Loading itinerary...</p>
            )}
        </div>
    )
}

export default Viewtrip
