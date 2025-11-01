import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";

function CostBreakdownPopover({ breakdown, formatCurrency }) {
    if (!breakdown) return null;

    // Handle backward compatibility and data transformation
    const transformedBreakdown = {
        hotel: breakdown.hotel || 0,
        food: breakdown.food || 0,
        activities: breakdown.activities || 0,
        // If old data has transport field, use it as primary_transport
        primary_transport: breakdown.primary_transport || breakdown.transport || 0,
        // If new data has local_transport use it, otherwise default to 0
        local_transport: breakdown.local_transport || 0
    };

    const totalTransport = transformedBreakdown.primary_transport + transformedBreakdown.local_transport;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="text-green-500 text-xs hover:text-green-600 flex items-center gap-1">
                    View breakdown
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
                <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Cost Breakdown</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Hotel</span>
                            <span className="font-medium">{formatCurrency(transformedBreakdown.hotel)}</span>
                        </div>
                        {transformedBreakdown.primary_transport > 0 ? (
                            <div className="space-y-2 border-l-2 border-slate-200 pl-3 my-2">
                                <div className="flex justify-between text-sm">
                                    <span>Primary Transport</span>
                                    <span className="font-medium">{formatCurrency(transformedBreakdown.primary_transport)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-600">
                                    <span>Local Transport</span>
                                    <span className="font-medium">{formatCurrency(transformedBreakdown.local_transport)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium pt-1 border-t border-slate-100">
                                    <span>Total Transport</span>
                                    <span>{formatCurrency(totalTransport)}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between text-sm">
                                <span>Transport</span>
                                <span className="font-medium">{formatCurrency(totalTransport)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm">
                            <span>Food</span>
                            <span className="font-medium">{formatCurrency(transformedBreakdown.food)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Activities</span>
                            <span className="font-medium">{formatCurrency(transformedBreakdown.activities)}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between text-sm font-semibold">
                            <span>Total</span>
                            <span>{formatCurrency(
                                transformedBreakdown.hotel + 
                                totalTransport +
                                transformedBreakdown.food + 
                                transformedBreakdown.activities
                            )}</span>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default CostBreakdownPopover;