import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { GetDetailedPlaceInfo, buildPhotoUrl } from '@/service/GlobalApi';
import { placesCache } from '@/service/PlacesCache';


// This is the original Hero component you provided. It remains unchanged.
function Hero() {
  return (
    <div className='relative min-h-screen bg-gradient-to-br from-blue-50/20 via-slate-50 to-blue-50/30'>
      {/* Professional grid background */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#dbeafe_1px,transparent_1px),linear-gradient(to_bottom,#dbeafe_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20'></div>

      {/* Subtle blue accent elements */}
      <div className='absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-blue-200/40 rounded-2xl rotate-12 opacity-50'></div>
      <div className='absolute top-60 right-20 w-20 h-20 bg-gradient-to-br from-blue-200/50 to-blue-300/60 rounded-xl -rotate-12 opacity-60'></div>
      <div className='absolute bottom-40 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-100/40 to-blue-200/50 rounded-full opacity-40'></div>

      <div className='relative flex flex-col items-center max-w-7xl mx-auto px-6 pt-16'>
        {/* Professional header section */}
        <div className='text-center space-y-8 mb-16'>
          <div className='flex items-center justify-center mb-8'>
            <img src="/cerebro-professional.svg" alt="CerebroCraft AI Travel Intelligence" className='h-16' />
          </div>

          <h1 className='font-bold text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight'>
            <span className='block text-slate-900 mb-2'>
              Your Intelligent
            </span>
            <span className='block text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-blue-600'>
              Travel Companion
            </span>
          </h1>

          <div className='w-24 h-0.5 bg-gradient-to-r from-slate-400 to-blue-500 mx-auto'></div>
        </div>

        {/* Professional value proposition */}
        <div className='text-center max-w-4xl mb-16'>
          <p className='text-xl md:text-2xl text-slate-600 leading-relaxed mb-8'>
            <span className='text-slate-800 font-semibold'>Dream destinations, data-driven planning, unforgettable memories</span>
            <br />
            Experience the perfect blend of AI intelligence and personalized travel curation.
          </p>

          {/* Key metrics */}
          <div className='grid grid-cols-3 gap-8 mb-12'>
            <div className='text-center'>
              <div className='text-3xl font-bold text-slate-800 mb-1'>2.5s</div>
              <div className='text-sm text-slate-600 uppercase tracking-wide'>Avg. Generation Time</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-slate-800 mb-1'>96%</div>
              <div className='text-sm text-slate-600 uppercase tracking-wide'>User Satisfaction</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-slate-800 mb-1'>150+</div>
              <div className='text-sm text-slate-600 uppercase tracking-wide'>Countries Covered</div>
            </div>
          </div>
        </div>

        {/* Professional CTA section */}
        <div className='flex flex-col sm:flex-row gap-4 mb-20'>
          <Link to={'/create-trip'}>
            <Button className='bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0'>
              Start Planning
            </Button>
          </Link>
          <Button variant="outline" className='border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300'>
            View Demo
          </Button>
        </div>

        {/* Professional features grid */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-6xl mb-20'>
          <div className='text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-blue-lg hover:shadow-blue-xl transition-all duration-300 border border-blue-100/50'>
            <div className='w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mx-auto mb-4'>
              <svg className='w-6 h-6 text-slate-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
              </svg>
            </div>
            <h3 className='font-semibold text-lg text-slate-800 mb-2'>AI Analytics</h3>
            <p className='text-slate-600 text-sm leading-relaxed'>Advanced algorithms analyze millions of data points for optimal recommendations</p>
          </div>

          <div className='text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-blue-lg hover:shadow-blue-xl transition-all duration-300 border border-blue-100/50'>
            <div className='w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4'>
              <svg className='w-6 h-6 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
              </svg>
            </div>
            <h3 className='font-semibold text-lg text-slate-800 mb-2'>Budget Optimization</h3>
            <p className='text-slate-600 text-sm leading-relaxed'>Intelligent cost analysis ensures maximum value within your specified budget range</p>
          </div>

          <div className='text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-blue-lg hover:shadow-blue-xl transition-all duration-300 border border-blue-100/50'>
            <div className='w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mx-auto mb-4'>
              <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
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

