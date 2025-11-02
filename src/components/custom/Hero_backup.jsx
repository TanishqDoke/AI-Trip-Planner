import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { GetDetailedPlaceInfo, buildPhotoUrl } from '@/service/GlobalApi';
import { placesCache } from '@/service/PlacesCache';


// EaseMyTrip-inspired Hero component with search-focused design
function Hero() {
  return (
    <div className='relative min-h-screen bg-white'>
      {/* Hero Banner Section - EaseMyTrip Style */}
      <div className='relative bg-gradient-to-r from-[#2276E3] to-[#1565C0] text-white py-20 overflow-hidden'>
        {/* Background decorative elements */}
        <div className='absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl'></div>

        <div className='relative max-w-7xl mx-auto px-4'>
          {/* Main Heading */}
          <div className='text-center mb-12'>
            <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl mb-4'>
              Plan Your Perfect Trip with AI
            </h1>
            <p className='text-xl md:text-2xl text-blue-100'>
              Personalized itineraries in seconds • Best prices guaranteed • 24/7 Support
            </p>
          </div>

          {/* CTA Button */}
          <div className='flex justify-center mb-8'>
            <Link to={'/create-trip'}>
              <Button className='bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-10 py-4 text-lg font-bold rounded-md shadow-xl hover:shadow-2xl transition-all duration-200 uppercase'>
                Start Planning Now
              </Button>
            </Link>
          </div>

          {/* Key Stats */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
            <div className='text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20'>
              <div className='text-3xl font-bold mb-1'>500K+</div>
              <div className='text-sm text-blue-100'>Happy Travelers</div>
            </div>
            <div className='text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20'>
              <div className='text-3xl font-bold mb-1'>150+</div>
              <div className='text-sm text-blue-100'>Destinations</div>
            </div>
            <div className='text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20'>
              <div className='text-3xl font-bold mb-1'>2.5s</div>
              <div className='text-sm text-blue-100'>Avg Response Time</div>
            </div>
            <div className='text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20'>
              <div className='text-3xl font-bold mb-1'>24/7</div>
              <div className='text-sm text-blue-100'>Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - EaseMyTrip Style */}
      <div className='max-w-7xl mx-auto px-4 py-16'>
        {/* Why Choose Us */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-3'>Why Plan With Us?</h2>
          <p className='text-lg text-gray-600'>Experience the best in AI-powered travel planning</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-16'>
          <div className='text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100'>
            <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-[#2276E3]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
              </svg>
            </div>
            <h3 className='font-bold text-lg text-gray-800 mb-2'>Instant Planning</h3>
            <p className='text-gray-600 text-sm'>Get your complete itinerary in seconds, not hours</p>
          </div>

          <div className='text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100'>
            <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-[#D32F2F]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
              </svg>
            </div>
            <h3 className='font-bold text-lg text-gray-800 mb-2'>Best Price</h3>
            <p className='text-gray-600 text-sm'>Optimized recommendations within your budget</p>
          </div>

          <div className='text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100'>
            <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
              </svg>
            </div>
            <h3 className='font-semibold text-lg text-slate-800 mb-2'>Real-time Processing</h3>
            <p className='text-slate-600 text-sm leading-relaxed'>Instant itinerary generation with live data integration and dynamic updates</p>
          </div>

          <div className='text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-blue-lg hover:shadow-blue-xl transition-all duration-300 border border-blue-100/50'>
            <div className='w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mx-auto mb-4'>
              <svg className='w-6 h-6 text-purple-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <h3 className='font-semibold text-lg text-slate-800 mb-2'>Quality Assurance</h3>
            <p className='text-slate-600 text-sm leading-relaxed'>Every recommendation verified through our comprehensive quality scoring system</p>
          </div>
        </div>

        {/* Professional showcase dashboard */}
        <div className='w-full max-w-6xl mb-20'>
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl shadow-blue-2xl border border-blue-100/50 p-12'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-slate-800 mb-4'>Enterprise-Grade Travel Intelligence</h2>
              <p className='text-lg text-slate-600 max-w-3xl mx-auto'>
                Leveraging advanced machine learning and real-time data processing to deliver
                personalized travel experiences that exceed expectations.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1'>
                    <div className='w-3 h-3 bg-slate-600 rounded-full'></div>
                  </div>
                  <div>
                    <h3 className='font-semibold text-slate-800 mb-1'>Multi-Parameter Analysis</h3>
                    <p className='text-slate-600 text-sm'>Processes location preferences, budget constraints, travel dates, and personal interests simultaneously</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1'>
                    <div className='w-3 h-3 bg-blue-600 rounded-full'></div>
                  </div>
                  <div>
                    <h3 className='font-semibold text-slate-800 mb-1'>Dynamic Optimization</h3>
                    <p className='text-slate-600 text-sm'>Continuously refines recommendations based on real-time pricing and availability data</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1'>
                    <div className='w-3 h-3 bg-green-600 rounded-full'></div>
                  </div>
                  <div>
                    <h3 className='font-semibold text-slate-800 mb-1'>Scalable Architecture</h3>
                    <p className='text-slate-600 text-sm'>Built on cloud infrastructure capable of handling enterprise-level demand and complexity</p>
                  </div>
                </div>
              </div>

              <div className='relative'>
                <div className='bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200'>
                  <div className='flex items-center gap-3 mb-6'>
                    <img src="/cerebro-professional.svg" alt="CerebroCraft" className='h-8' />
                    <div className='flex gap-2'>
                      <div className='w-3 h-3 bg-red-400 rounded-full'></div>
                      <div className='w-3 h-3 bg-yellow-400 rounded-full'></div>
                      <div className='w-3 h-3 bg-green-400 rounded-full'></div>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div className='flex justify-between items-center p-3 bg-white rounded-lg shadow-sm'>
                      <span className='text-sm text-slate-600'>Processing Request...</span>
                      <div className='w-16 h-2 bg-slate-200 rounded-full'>
                        <div className='w-12 h-2 bg-blue-500 rounded-full'></div>
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-3'>
                      <div className='p-3 bg-white rounded-lg shadow-sm'>
                        <div className='text-xs text-slate-500 mb-1'>Destinations</div>
                        <div className='text-sm font-medium text-slate-800'>247 analyzed</div>
                      </div>
                      <div className='p-3 bg-white rounded-lg shadow-sm'>
                        <div className='text-xs text-slate-500 mb-1'>Hotels</div>
                        <div className='text-sm font-medium text-slate-800'>1,432 reviewed</div>
                      </div>
                    </div>

                    <div className='p-3 bg-green-50 border border-green-200 rounded-lg'>
                      <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                        <span className='text-sm text-green-700 font-medium'>Itinerary Generated</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

// This is the new, appended component for displaying the dynamic trip image.
export function HeroWithImage({ trip }) {
  const [imageUrl, setImageUrl] = useState('/landing.png'); // Default fallback image
  const [isLoading, setIsLoading] = useState(true);

  // Safely get the trip title, providing a fallback.
  const tripTitle = trip?.userSelection?.location?.label || 'Your Next Adventure';

  useEffect(() => {
    // This function will run when the component mounts or the 'trip' prop changes.
    const fetchDestinationPhoto = async () => {
      console.log('HeroWithImage - Trip data:', trip);
      console.log('HeroWithImage - Location:', trip?.userSelection?.location?.label);

      // Ensure we have the necessary trip data and a location label to search for.
      if (!trip?.userSelection?.location?.label) {
        console.log('HeroWithImage - No location found, using fallback');
        setIsLoading(false);
        setImageUrl('/landing.png'); // Use fallback if no location is found
        return;
      }

      setIsLoading(true);
      const destinationName = trip.userSelection.location.label;
      console.log('HeroWithImage - Fetching photo for:', destinationName);

      try {
        // Use the cache to avoid re-fetching data for the same destination.
        const response = await placesCache.get(destinationName, () => GetDetailedPlaceInfo(destinationName));
        console.log('HeroWithImage - API Response:', response.data);

        // Check if the API returned a place with photos.
        const photoName = response.data?.places?.[0]?.photos?.[0]?.name;
        console.log('HeroWithImage - Photo name:', photoName);

        if (photoName) {
          // If a photo name is found, build the full URL.
          const fullUrl = buildPhotoUrl(photoName);
          console.log('HeroWithImage - Built photo URL:', fullUrl);
          setImageUrl(fullUrl);
        } else {
          console.log('HeroWithImage - No photo found, using fallback');
          // If no photo is found for the destination, use the fallback.
          setImageUrl('/landing.png');
        }
      } catch (error) {
        console.error('HeroWithImage - Failed to fetch destination photo:', error);
        setImageUrl('/landing.png'); // Use fallback on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinationPhoto();
  }, [trip]); // Re-run the effect if the trip object changes.

  const handleImageError = () => {
    // If the constructed URL fails to load, revert to the fallback.
    setImageUrl('/landing.png');
  };

  return (
    <div className='relative w-full h-[50vh] min-h-[300px] max-h-[450px] bg-slate-800 text-white'>
      <div className='absolute inset-0'>
        {isLoading ? (
          // Simple loading indicator while the image is fetched
          <div className="w-full h-full bg-slate-200 flex items-center justify-center">
            <div className='w-8 h-8 border-4 border-slate-400 border-t-transparent rounded-full animate-spin'></div>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={`A scenic view of ${tripTitle}`}
            className='w-full h-full object-cover'
            onError={handleImageError}
          />
        )}
      </div>
      {/* A gradient overlay makes the text on top more readable. */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />

      {/* Hero Content */}
      <div className='relative h-full flex flex-col justify-end items-start p-6 md:p-12'>
        <div className='max-w-4xl'>
          <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight'>
            {tripTitle}
          </h1>
          <p className='text-lg md:text-xl text-slate-200 mt-2'>
            Your AI-Generated Itinerary
          </p>
        </div>
      </div>
    </div>
  );
}

