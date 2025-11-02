# app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from agents.travel_agent import TravelAgent
from agents.email_service import EmailService
import json

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

email_service = EmailService()  

# Initialize Travel Agent
travel_agent = TravelAgent(
    google_api_key=os.getenv('GOOGLE_API_KEY')
)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'Travel Concierge API'}), 200

@app.route('/api/travel/search', methods=['POST'])
def search_travel():
    """Search for travel options (flight/train/bus) using Gemini AI"""
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['origin', 'destination', 'departureDate']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Use Gemini AI to generate travel options
        result = travel_agent.search_travel_options(
            origin=data['origin'],
            destination=data['destination'],
            departure_date=data['departureDate'],
            return_date=data.get('returnDate'),
            passengers=data.get('passengers', 1),
            travel_mode=data.get('mode', 'flight')  # flight, train, or bus
        )
        
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/hotels/search', methods=['POST'])
def search_hotels():
    """Search for hotels using Google ADK agent"""
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['location', 'checkIn', 'checkOut']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Use ADK agent to search hotels
        result = travel_agent.search_hotels(
            location=data['location'],
            check_in=data['checkIn'],
            check_out=data['checkOut'],
            guests=data.get('guests', 1),
            rooms=data.get('rooms', 1)
        )
        
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/travel/book', methods=['POST'])
def book_travel():
    """Book travel (flight/train/bus)"""
    try:
        data = request.json
        
        # Validate required fields
        if 'travelOffer' not in data or 'passengers' not in data:
            return jsonify({'error': 'Missing required booking information'}), 400
        
        # Use agent to book travel
        result = travel_agent.book_travel(
            travel_offer=data['travelOffer'],
            passengers=data['passengers'],
            payment_info=data.get('payment')
        )
        
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/hotels/book', methods=['POST'])
def book_hotel():
    """Book a hotel"""
    try:
        data = request.json
        
        # Validate required fields
        if 'hotelOffer' not in data or 'guests' not in data:
            return jsonify({'error': 'Missing required booking information'}), 400
        
        # Use ADK agent to book hotel
        result = travel_agent.book_hotel(
            hotel_offer=data['hotelOffer'],
            guests=data['guests'],
            payment_info=data.get('payment')
        )
        
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# @app.route('/api/itinerary/generate', methods=['POST'])
# def generate_itinerary():
#     """Generate complete itinerary with flights and hotels using AI"""
#     try:
#         data = request.json
        
#         # Use ADK agent to generate complete itinerary
#         result = travel_agent.generate_complete_itinerary(
#             destination=data['destination'],
#             origin=data.get('origin'),
#             start_date=data['startDate'],
#             end_date=data['endDate'],
#             budget=data.get('budget'),
#             preferences=data.get('preferences', {})
#         )
        
#         return jsonify(result), 200
    
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

@app.route('/api/send-itinerary-email', methods=['POST'])
def send_itinerary_email():
    """Send itinerary email to user after trip creation"""
    try:
        data = request.json
        print("\n" + "="*80)
        print("🔍 FULL RECEIVED DATA STRUCTURE:")
        print("="*80)
        print(json.dumps(data, indent=2, default=str))
        print("="*80 + "\n")

        if not data.get('userEmail'):
            return jsonify({'error': 'Missing user email'}), 400
        
        # Format dates properly - only if they exist
        start_date = data.get('startDate')
        end_date = data.get('endDate')
        
        # Calculate duration if dates are available
        duration = data.get('noOfDays', None)
        
        # Get AI optimized price
        cost_estimates = data.get('costEstimates', {})
        budget_amount = cost_estimates.get('ai_optimized_price', {}).get('amount') or data.get('budget')
        
        # Get raw itinerary and parse it
        itinerary_raw = data.get('aiItineraryRaw', '')
        itinerary_array = data.get('itinerary', [])
        
        print(f"\n{'='*60}")
        print(f"📧 EMAIL DATA RECEIVED:")
        print(f"{'='*60}")
        print(f"  Start Date: {start_date}")
        print(f"  End Date: {end_date}")
        print(f"  Duration: {duration}")
        print(f"  Budget: ₹{budget_amount}")
        print(f"  Itinerary Array Length: {len(itinerary_array)}")
        print(f"  Raw Itinerary Length: {len(itinerary_raw)}")
        
        # Prepare email data
        email_data = {
            'destination': data.get('destination', 'Your Destination'),
            'dates': {
                'start': start_date,
                'end': end_date
            },
            'duration': duration,
            'budget': budget_amount,
            'costEstimates': cost_estimates,
            'availableHotels': data.get('hotels', [])[:3],
            'availableFlights': data.get('flights', [])[:3],
            'itinerary': itinerary_array,  # Pass structured array
            'aiItineraryRaw': itinerary_raw,  # Pass raw text
            'success': True
        }
        
        # Send email
        email_sent = email_service.send_itinerary_email(
            recipient_email=data['userEmail'],
            user_name=data.get('userName', 'Traveler'),
            itinerary_data=email_data
        )
        
        return jsonify({
            'success': email_sent,
            'message': 'Email sent successfully' if email_sent else 'Email sending failed'
        }), 200
        
    except Exception as e:
        print(f"Error in send_itinerary_email: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


def _format_itinerary_for_email(itinerary_array, raw_text):
    """Format itinerary array into readable, complete text with activities"""
    
    # First try to use structured itinerary array
    if itinerary_array and isinstance(itinerary_array, list) and len(itinerary_array) > 0:
        formatted = []
        
        for day in itinerary_array:
            day_num = day.get('day', f'Day {len(formatted) + 1}')
            theme = day.get('theme', '')
            activities = day.get('activities', [])
            
            # Add day header
            formatted.append(f"\n{'='*70}")
            formatted.append(f"📋 {day_num}")
            if theme:
                formatted.append(f"Theme: {theme}")
            formatted.append(f"{'='*70}\n")
            
            # Add activities with details
            if isinstance(activities, list) and len(activities) > 0:
                for idx, activity in enumerate(activities, 1):
                    if isinstance(activity, dict):
                        time = activity.get('time', '')
                        place = activity.get('place_name', activity.get('activity', 'Activity'))
                        description = activity.get('description', '')
                        
                        formatted.append(f"{idx}. {place}")
                        if time:
                            formatted.append(f"   ⏰ Time: {time}")
                        if description:
                            formatted.append(f"   📝 Description: {description}")
                        formatted.append("")  # Add space between activities
                    elif isinstance(activity, str):
                        formatted.append(f"{idx}. {activity}")
                        formatted.append("")
            else:
                formatted.append("   Activities to be confirmed\n")
        
        result = '\n'.join(formatted)
        print(f"\n✅ Formatted itinerary from array: {len(result)} characters")
        return result
    
    # Fallback to raw text if structured data not available
    if raw_text:
        text = raw_text.strip()
        
        # Remove markdown code blocks if present
        if text.startswith('```'):
            lines = text.split('\n')
            if len(lines) > 2:
                text = '\n'.join(lines[1:-1])
        
        print(f"\n✅ Using raw itinerary text: {len(text)} characters")
        return text
    
    print(f"\n⚠️  No itinerary data available")
    return "Your personalized itinerary has been created!"


@app.route('/api/itinerary/generate', methods=['POST'])
def generate_itinerary():
    """Generate complete itinerary with flights and hotels using AI"""
    try:
        data = request.json
        
        # Generate itinerary
        result = travel_agent.generate_complete_itinerary(
            destination=data['destination'],
            origin=data.get('origin'),
            start_date=data['startDate'],
            end_date=data['endDate'],
            budget=data.get('budget'),
            preferences=data.get('preferences', {})
        )
        
        # Send email if itinerary generation was successful
        if result.get('success'):
            user_email = data.get('userEmail')
            user_name = data.get('userName')
            
            if user_email:
                try:
                    email_sent = email_service.send_itinerary_email(
                        recipient_email=user_email,
                        user_name=user_name,
                        itinerary_data=result
                    )
                    result['emailSent'] = email_sent
                except Exception as email_error:
                    print(f"Failed to send email: {email_error}")
                    result['emailSent'] = False
            
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
