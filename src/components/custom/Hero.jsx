import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { GetDetailedPlaceInfo, buildPhotoUrl } from '@/service/GlobalApi';
import { placesCache } from '@/service/PlacesCache';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/translations/translations';

// EaseMyTrip-inspired Hero component with search-focused design
function Hero() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  
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
              {t('planPerfectTripAI')}
            </h1>
            <p className='text-xl md:text-2xl text-blue-100'>
              {t('personalizedItineraries')}
            </p>
          </div>

          {/* CTA Button */}
          <div className='flex justify-center mb-8'>
            <Link to={'/create-trip'}>
              <Button className='bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-10 py-4 text-lg font-bold rounded-md shadow-xl hover:shadow-2xl transition-all duration-200 uppercase'>
                {t('startPlanningNow')}
              </Button>
            </Link>
          </div>

          {/* Key Stats */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
            <div className='text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20'>
              <div className='text-3xl font-bold mb-1'>500K+</div>
              <div className='text-sm text-blue-100'>{t('happyTravelers')}</div>
            </div>
            <div className='text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20'>
              <div className='text-3xl font-bold mb-1'>150+</div>
              <div className='text-sm text-blue-100'>{t('destinations')}</div>
            </div>
            <div className='text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20'>
              <div className='text-3xl font-bold mb-1'>2.5s</div>
              <div className='text-sm text-blue-100'>{t('avgResponseTime')}</div>
            </div>
            <div className='text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20'>
              <div className='text-3xl font-bold mb-1'>24/7</div>
              <div className='text-sm text-blue-100'>{t('supportAvailable')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - EaseMyTrip Style */}
      <div className='max-w-7xl mx-auto px-4 py-16'>
        {/* Why Choose Us */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-3'>{t('whyPlanWithUs')}</h2>
          <p className='text-lg text-gray-600'>{t('experienceBest')}</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-16'>
          <div className='text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100'>
            <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-[#2276E3]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
              </svg>
            </div>
            <h3 className='font-bold text-lg text-gray-800 mb-2'>{t('instantPlanning')}</h3>
            <p className='text-gray-600 text-sm'>{t('instantPlanningDesc')}</p>
          </div>

          <div className='text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100'>
            <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-[#D32F2F]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
              </svg>
            </div>
            <h3 className='font-bold text-lg text-gray-800 mb-2'>{t('bestPrice')}</h3>
            <p className='text-gray-600 text-sm'>{t('bestPriceDesc')}</p>
          </div>

          <div className='text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100'>
            <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <h3 className='font-bold text-lg text-gray-800 mb-2'>{t('aiPersonalization')}</h3>
            <p className='text-gray-600 text-sm'>{t('aiPersonalizationDesc')}</p>
          </div>

          <div className='text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100'>
            <div className='w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' />
              </svg>
            </div>
            <h3 className='font-bold text-lg text-gray-800 mb-2'>{t('multipleDestinations')}</h3>
            <p className='text-gray-600 text-sm'>{t('multipleDestinationsDesc')}</p>
          </div>
        </div>

        {/* Offers Banner - EaseMyTrip Style */}
        <div className='bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8 border-2 border-dashed border-[#D32F2F] mb-16'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <div>
              <h3 className='text-2xl font-bold text-gray-800 mb-2'>{t('specialOffer')}</h3>
              <p className='text-gray-700 text-lg'>{t('firstItineraryFree')}</p>
            </div>
            <Link to={'/create-trip'}>
              <Button className='bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-8 py-3 text-base font-bold rounded-md shadow-lg uppercase'>
                {t('claimOffer')}
              </Button>
            </Link>
          </div>
        </div>

        {/* How It Works */}
        <div className='bg-gray-50 rounded-xl p-8 md:p-12'>
          <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>{t('howItWorks')}</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-20 h-20 bg-[#2276E3] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold'>
                1
              </div>
              <h3 className='font-bold text-xl text-gray-800 mb-2'>{t('enterDetails')}</h3>
              <p className='text-gray-600'>{t('enterDetailsDesc')}</p>
            </div>
            <div className='text-center'>
              <div className='w-20 h-20 bg-[#2276E3] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold'>
                2
              </div>
              <h3 className='font-bold text-xl text-gray-800 mb-2'>{t('aiMagic')}</h3>
              <p className='text-gray-600'>{t('aiMagicDesc')}</p>
            </div>
            <div className='text-center'>
              <div className='w-20 h-20 bg-[#2276E3] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold'>
                3
              </div>
              <h3 className='font-bold text-xl text-gray-800 mb-2'>{t('getItinerary')}</h3>
              <p className='text-gray-600'>{t('getItineraryDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className='bg-[#2276E3] text-white py-16'>
        <div className='max-w-4xl mx-auto px-4 text-center'>
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>{t('readyToStart')}</h2>
          <p className='text-xl text-blue-100 mb-8'>{t('joinThousands')}</p>
          <Link to={'/create-trip'}>
            <Button className='bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-12 py-4 text-lg font-bold rounded-md shadow-xl hover:shadow-2xl transition-all duration-200 uppercase'>
              {t('createMyTrip')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero

// Dynamic trip image component
export function HeroWithImage({ trip }) {
  const [imageUrl, setImageUrl] = useState('/landing.png');
  const [isLoading, setIsLoading] = useState(true);

  const tripTitle = trip?.userSelection?.location?.label || 'Your Next Adventure';

  useEffect(() => {
    const fetchDestinationPhoto = async () => {
      if (!trip?.userSelection?.location?.label) {
        setIsLoading(false);
        setImageUrl('/landing.png');
        return;
      }

      setIsLoading(true);
      const destinationName = trip.userSelection.location.label;

      try {
        const response = await placesCache.get(destinationName, () => GetDetailedPlaceInfo(destinationName));
        const photoName = response.data?.places?.[0]?.photos?.[0]?.name;

        if (photoName) {
          const fullUrl = buildPhotoUrl(photoName);
          setImageUrl(fullUrl);
        } else {
          setImageUrl('/landing.png');
        }
      } catch (error) {
        console.error('Failed to fetch destination photo:', error);
        setImageUrl('/landing.png');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinationPhoto();
  }, [trip]);

  const handleImageError = () => {
    setImageUrl('/landing.png');
  };

  return (
    <div className='relative w-full h-[50vh] min-h-[300px] max-h-[450px] bg-slate-800 text-white'>
      <div className='absolute inset-0'>
        {isLoading ? (
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
      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent' />

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
