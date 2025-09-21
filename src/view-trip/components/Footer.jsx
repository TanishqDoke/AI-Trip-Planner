import React from 'react'

function Footer() {
  return (
    <div className='mt-12 pt-8 border-t border-slate-200'>
        <div className='text-center'>
            <div className='flex items-center justify-center gap-3 mb-4'>
                <img src="/cerebro-professional.svg" alt="CerebroCraft" className='h-6' />
                <span className='text-slate-600 font-medium'>CerebroCraft</span>
            </div>
            <p className='text-sm text-slate-500'>
                Powered by AI • Built for seamless travel planning
            </p>
        </div>
    </div>
  )
}

export default Footer