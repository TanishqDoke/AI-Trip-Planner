import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { useLanguage } from '@/context/LanguageContext';
import { getTranslation } from '@/translations/translations';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);
  const { language, changeLanguage } = useLanguage();
  
  const t = (key) => getTranslation(language, key);

  // Debug logging
  useEffect(() => {
    console.log('Current language:', language);
    console.log('Plan Trip translation:', t('planTrip'));
  }, [language]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' }
  ];

  useEffect(() => {
    console.log(user)
  })

  const login = useGoogleLogin({
    onSuccess: (res) => GetUserProfile(res),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'application/json',
      },
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    }).catch((error) => {
      console.error("Error fetching user profile: ", error);
    });
  }

  return (
    <div className='bg-white shadow-md border-b border-gray-200 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex justify-between items-center py-3'>
          <div className='flex items-center gap-8'>
            <a href="/" className='cursor-pointer'>
              <img src="/cerebro-professional.svg" alt="AI Travel Planner" className='h-12 hover:opacity-80 transition-opacity' />
            </a>
            <nav className='hidden md:flex items-center gap-6'>
              <a href="/create-trip" className='text-gray-700 hover:text-[#2276E3] font-medium text-sm transition-colors'>
                {t('planTrip')}
              </a>
              <a href="/my-trips" className='text-gray-700 hover:text-[#2276E3] font-medium text-sm transition-colors'>
                My Trips
              </a>
              
            </nav>
          </div>
          <div className='flex items-center gap-4'>
            {/* Language Selector */}
            <Popover>
              <PopoverTrigger>
                <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-md transition-colors border border-gray-200'>
                  <span className='text-xl'>{languages.find(l => l.code === language)?.flag}</span>
                  <span className='text-sm font-medium text-gray-700 hidden sm:block'>
                    {languages.find(l => l.code === language)?.name}
                  </span>
                  <svg className='w-4 h-4 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                  </svg>
                </div>
              </PopoverTrigger>
              <PopoverContent className='bg-white border border-gray-200 shadow-xl p-2 w-48'>
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className={`flex items-center gap-3 cursor-pointer px-4 py-2 rounded-md transition-colors ${
                      language === lang.code 
                        ? 'bg-blue-50 text-blue-700 font-semibold' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    onClick={() => changeLanguage(lang.code)}
                  >
                    <span className='text-xl'>{lang.flag}</span>
                    <span className='text-sm'>{lang.name}</span>
                    {language === lang.code && (
                      <svg className='w-4 h-4 ml-auto text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                      </svg>
                    )}
                  </div>
                ))}
              </PopoverContent>
            </Popover>
            
            <div>
            {user ?
              <div className='flex items-center gap-4'>
                <Popover>
                  <PopoverTrigger>
                    <div className='flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-md transition-colors'>
                      <img src={user?.picture} alt="User Avatar" className='h-8 w-8 rounded-full border-2 border-[#2276E3]' />
                      <span className='text-sm font-medium text-gray-700 hidden sm:block'>{user?.name?.split(' ')[0]}</span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className='bg-white border border-gray-200 shadow-xl'>
                    <h2 className='cursor-pointer text-gray-700 hover:text-[#D32F2F] font-medium py-2 px-4 rounded-md hover:bg-gray-50 transition-colors' onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}>{t('signOut')}</h2>
                  </PopoverContent>
                </Popover>

              </div> : <Button
                onClick={() => setOpenDialog(true)}
                className='bg-[#2276E3] hover:bg-[#1b5cba] text-white px-6 py-2 rounded-md font-medium shadow-md hover:shadow-lg transition-all duration-200'
              >
                {t('loginSignup')}
              </Button>}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className='bg-white border border-gray-200 shadow-2xl'>
          <DialogHeader>
            <DialogDescription>
              <div className='flex flex-col items-center text-center space-y-6'>
                <img src="/cerebro-professional.svg" alt="AI Travel Planner Logo" width="180px" className='mx-auto' />
                <div className='space-y-3'>
                  <h2 className='font-bold text-2xl text-gray-800'>{t('welcomeMessage')}</h2>
                  <p className='text-gray-600 text-base'>{t('signInPrompt')}</p>
                </div>
                <Button
                  onClick={login}
                  className="w-full mt-6 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 py-3 px-6 rounded-md flex gap-4 items-center justify-center font-medium shadow-sm hover:shadow-md transition-all duration-200">
                  <FcGoogle className="h-6 w-6" />
                  {t('continueWithGoogle')}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default Header