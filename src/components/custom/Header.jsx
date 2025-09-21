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
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t } = useTranslation();  // Added translation hook
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  }

  return (
    <div className='shadow-sm flex justify-between items-center px-6'>
      <img src="/logo.svg" alt={t('logo_alt')} />
      <div className="flex items-center gap-4">
        <select
          onChange={handleLanguageChange}
          defaultValue={i18n.language}
          className="border rounded px-2 py-1"
          aria-label={t('select_language')}
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="mr">मराठी</option>
        </select>

        {user ?
          <div className='flex items-center gap-3'>
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">{t('create_trip')}</Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">{t('my_trips')}</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} alt={t('user_profile_picture')} className='h-[35px] w-[35px] rounded-full' />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>{t('logout')}</h2>
              </PopoverContent>
            </Popover>
          </div> : <Button onClick={()=>setOpenDialog(true)}>{t('sign_in')}</Button>}
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt={t('logo_alt')} width="100px" className='items-center' />
              <h2 className='font-bold text-lg'>{t('sign_in_heading')}</h2>
              <p>{t('sign_in_subheading')}</p>
              <Button
                onClick={login}
                className="w-full mt-6 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />{t('sign_in_with_google')}
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header;
