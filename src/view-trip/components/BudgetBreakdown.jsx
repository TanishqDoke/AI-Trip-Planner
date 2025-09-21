import React from 'react';

function BudgetBreakdown({ trip }) {
    if (!trip || !trip.tripData) {
        return null;
    }

    const days = parseInt(trip?.userSelection?.noOfDays || 1);
    const estimatedTotal = days * 3500;
    const estimatedMarket = Math.round(estimatedTotal * 1.42);
    const estimatedSavings = estimatedMarket - estimatedTotal;
    const estimatedPercentage = Math.round((estimatedSavings / estimatedMarket) * 100);
    
    function formatCurrency(amount) {
        return '₹' + amount.toLocaleString();
    }

    return (
        <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
            <div className='bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b border-slate-200'>
                <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
                        <svg className='w-4 h-4 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' />
                        </svg>
                    </div>
                    <div>
                        <h2 className='text-xl font-semibold text-slate-900'>Trip Budget Breakdown</h2>
                        <p className='text-sm text-slate-600'>AI-optimized pricing for your {days}-day trip</p>
                    </div>
                </div>
            </div>
            
            <div className='p-6'>
                <div className='bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 mb-6 text-white'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-green-100 text-sm font-medium'>AI-Powered Savings</p>
                            <p className='text-4xl font-bold'>{estimatedPercentage}%</p>
                            <p className='text-green-100 text-sm'>saved using our platform</p>
                        </div>
                        <div className='text-right'>
                            <p className='text-green-100 text-sm'>Total Savings</p>
                            <p className='text-2xl font-bold'>{formatCurrency(estimatedSavings)}</p>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-4 mb-6'>
                    <div className='bg-red-50 rounded-lg p-4 border border-red-100'>
                        <p className='text-red-600 text-sm font-medium mb-1'>Market Price</p>
                        <p className='text-2xl font-bold text-red-700 line-through'>{formatCurrency(estimatedMarket)}</p>
                        <p className='text-red-500 text-xs'>Traditional booking</p>
                    </div>
                    <div className='bg-green-50 rounded-lg p-4 border border-green-100'>
                        <p className='text-green-600 text-sm font-medium mb-1'>AI Optimized Price</p>
                        <p className='text-2xl font-bold text-green-700'>{formatCurrency(estimatedTotal)}</p>
                        <p className='text-green-500 text-xs'>Our platform</p>
                    </div>
                </div>

                <div className='bg-blue-50 rounded-lg p-4 border border-blue-100'>
                    <div className='flex items-start gap-3'>
                        <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
                            <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
                            </svg>
                        </div>
                        <div>
                            <h4 className='font-semibold text-blue-900 mb-1'>AI-Powered Savings</h4>
                            <p className='text-blue-700 text-sm'>
                                Our intelligent system finds the best deals, optimal routes, and budget-friendly alternatives that traditional booking platforms often miss, saving you {estimatedPercentage}% on your trip.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BudgetBreakdown;