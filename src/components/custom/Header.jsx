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

function Header() {
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

  return (
    <div className='bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 flex justify-between items-center px-6 py-4 sticky top-0 z-50'>
      <div className='flex items-center gap-3'>
        <img src="/cerebro-professional.svg" alt="CerebroCraft AI Travel Intelligence" className='h-10' />
      </div>
      <div>
        {user ?
          <div className='flex items-center gap-3'>
            <a href="/create-trip">
            <Button variant="outline" className="rounded-lg border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 font-medium">
              Create Trip
            </Button>
            </a>
            <a href="/my-trips">
            <Button variant="outline" className="rounded-lg border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300 font-medium">
              My Trips
            </Button>
            </a>
            <Popover>
              <PopoverTrigger>             
                <img src={user?.picture} alt="User Avatar" className='h-[36px] w-[36px] rounded-full border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 cursor-pointer' />
              </PopoverTrigger>
              <PopoverContent className='bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg'>
                <h2 className='cursor-pointer text-slate-700 hover:text-slate-900 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-all duration-300' onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Sign Out</h2>
              </PopoverContent>
            </Popover>

          </div> : <Button 
                    onClick={()=>setOpenDialog(true)} 
                    className='bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300'
                  >
                    Sign In
                  </Button>}
      </div>

      <Dialog open={openDialog}>
        <DialogContent className='bg-white/98 backdrop-blur-md border border-slate-200 shadow-xl'>
          <DialogHeader>
            <DialogDescription>
              <div className='flex flex-col items-center text-center space-y-6'>
                <img src="/cerebro-professional.svg" alt="CerebroCraft Logo" width="200px" className='mx-auto' />
                <div className='space-y-3'>
                  <h2 className='font-bold text-2xl text-slate-800'>Welcome to CerebroCraft</h2>
                  <p className='text-slate-600 text-lg'>Access your AI travel intelligence platform</p>
                </div>
                <Button
                  onClick={login}
                  className="w-full mt-8 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 py-4 px-6 rounded-lg flex gap-4 items-center justify-center font-medium shadow-sm hover:shadow-md transition-all duration-300">
                  <FcGoogle className="h-6 w-6" />
                  Continue with Google
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