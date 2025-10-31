"""
Travel Agent using Google Gemini AI
Generates realistic flight, train, and bus options for any route
"""

import google.generativeai as genai
from datetime import datetime, timedelta
import json
import random

class TravelAgent:
    def __init__(self, google_api_key):
        # Initialize Google Gemini
        genai.configure(api_key=google_api_key)
        self.model = genai.GenerativeModel('gemini-pro')
    
    def search_travel_options(self, origin, destination, departure_date, return_date=None, passengers=1, travel_mode='flight'):
        """Generate realistic travel options using Gemini AI"""
        try:
            prompt = f"""
Generate {5} realistic {travel_mode} options from {origin} to {destination} on {departure_date}.

Requirements:
1. Use REAL airline/train/bus operator names appropriate for this route
2. Generate realistic timings (morning, afternoon, evening options)
3. Calculate realistic prices in INR based on distance and travel mode
4. Include realistic duration based on actual distance
5. For flights: include real airline codes, flight numbers
6. For trains: include real train names and numbers if available in India
7. For buses: include real bus operators

Return ONLY valid JSON array with this exact structure:
[
  {{
    "id": "unique_id",
    "operator": "Operator Name (e.g., IndiGo, Rajdhani Express, RedBus)",
    "operatorCode": "6E/12301/RB123",
    "number": "6E-2045/12301/RB-456",
    "departure": {{
      "location": "{origin}",
      "time": "2024-11-15T08:00:00",
      "terminal": "Terminal info if applicable"
    }},
    "arrival": {{
      "location": "{destination}",
      "time": "2024-11-15T10:30:00",
      "terminal": "Terminal info if applicable"
    }},
    "duration": "2h 30m",
    "price": {{
      "amount": 4500,
      "currency": "INR"
    }},
    "class": "Economy/Sleeper/Seater",
    "stops": 0,
    "amenities": ["WiFi", "Meals", "etc"]
  }}
]

Make prices realistic for Indian market. Flights: ₹3000-15000, Trains: ₹500-3000, Buses: ₹300-2000.
"""

            response = self.model.generate_content(prompt)
            response_text = response.text.strip()
            
            # Clean the response
            if response_text.startswith('```json'):
                response_text = response_text[7:]
            if response_text.startswith('```'):
                response_text = response_text[3:]
            if response_text.endswith('```'):
                response_text = response_text[:-3]
            
            response_text = response_text.strip()
            
            # Parse JSON
            travel_options = json.loads(response_text)
            
            # Get AI recommendations
            recommendations = self._get_travel_recommendations(travel_options, travel_mode, passengers)
            
            return {
                'success': True,
                'options': travel_options,
                'recommendations': recommendations,
                'count': len(travel_options),
                'mode': travel_mode
            }
        
        except Exception as error:
            print(f"Error generating travel options: {error}")
            # Return fallback options
            return self._generate_fallback_options(origin, destination, departure_date, travel_mode, passengers)
    
    def _generate_fallback_options(self, origin, destination, departure_date, travel_mode, passengers):
        """Generate basic fallback options if AI fails"""
        base_prices = {
            'flight': 5000,
            'train': 1500,
            'bus': 800
        }
        
        operators = {
            'flight': ['IndiGo', 'Air India', 'SpiceJet', 'Vistara'],
            'train': ['Rajdhani Express', 'Shatabdi Express', 'Duronto Express'],
            'bus': ['RedBus', 'VRL Travels', 'SRS Travels', 'Orange Travels']
        }
        
        options = []
        base_price = base_prices.get(travel_mode, 1000)
        
        for i in range(3):
            dep_time = datetime.strptime(departure_date, '%Y-%m-%d') + timedelta(hours=8 + i*4)
            arr_time = dep_time + timedelta(hours=2 + i*0.5)
            
            options.append({
                'id': f'{travel_mode}_{i+1}',
                'operator': random.choice(operators.get(travel_mode, ['Generic'])),
                'operatorCode': f'OP{i+1}',
                'number': f'{travel_mode.upper()}-{1000+i}',
                'departure': {
                    'location': origin,
                    'time': dep_time.isoformat(),
                    'terminal': 'Main Terminal'
                },
                'arrival': {
                    'location': destination,
                    'time': arr_time.isoformat(),
                    'terminal': 'Main Terminal'
                },
                'duration': f'{2+i}h 30m',
                'price': {
                    'amount': base_price + (i * 500),
                    'currency': 'INR'
                },
                'class': 'Economy',
                'stops': i,
                'amenities': ['Basic Service']
            })
        
        return {
            'success': True,
            'options': options,
            'recommendations': f'Showing {len(options)} {travel_mode} options',
            'count': len(options),
            'mode': travel_mode
        }
    
    def book_travel(self, travel_offer, passengers, payment_info=None):
        """Book travel (simulation)"""
        booking_reference = f"BK{datetime.now().strftime('%Y%m%d%H%M%S')}"
        
        return {
            'success': True,
            'bookingReference': booking_reference,
            'status': 'CONFIRMED',
            'travel': travel_offer,
            'passengers': passengers,
            'message': f'{travel_offer.get("operator", "Travel")} booking confirmed!'
        }
    
    def generate_complete_itinerary(self, destination, origin, start_date, end_date, budget=None, preferences=None):
        """Generate a complete travel itinerary using AI"""
        
        # Create prompt for Gemini
        prompt = f"""
        Generate a comprehensive travel itinerary for:
        - Destination: {destination}
        - Origin: {origin}
        - Travel Dates: {start_date} to {end_date}
        - Budget: {budget if budget else 'Flexible'}
        - Preferences: {json.dumps(preferences) if preferences else 'None'}
        
        Include:
        1. Recommended flights (with approximate times and prices)
        2. Hotel recommendations (with price ranges)
        3. Daily itinerary with activities
        4. Transportation suggestions
        5. Budget breakdown
        
        Format the response as JSON.
        """
        
        try:
            response = self.model.generate_content(prompt)
            ai_itinerary = response.text
            
            # Also search for actual flights and hotels
            flights = self.search_flights(origin, destination, start_date, end_date)
            hotels = self.search_hotels(destination, start_date, end_date)
            
            return {
                'success': True,
                'aiItinerary': ai_itinerary,
                'availableFlights': flights.get('flights', [])[:3],  # Top 3
                'availableHotels': hotels.get('hotels', [])[:3],  # Top 3
                'destination': destination,
                'dates': {
                    'start': start_date,
                    'end': end_date
                }
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def _get_travel_recommendations(self, options, travel_mode, passengers):
        """Get AI recommendations for travel options"""
        if not options:
            return f"No {travel_mode} options available"
        
        prompt = f"""
        Analyze these {travel_mode} options and provide a brief recommendation (2-3 sentences):
        Number of passengers: {passengers}
        
        Options: {json.dumps(options[:3], indent=2)}
        
        Consider: price, duration, timing, and convenience. Recommend the best option.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except:
            return f"Compare prices and timings to choose the best {travel_mode} option"
