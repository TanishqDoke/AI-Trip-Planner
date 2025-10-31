from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from agents.travel_agent import TravelAgent

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

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

@app.route('/api/itinerary/generate', methods=['POST'])
def generate_itinerary():
    """Generate complete itinerary with flights and hotels using AI"""
    try:
        data = request.json
        
        # Use ADK agent to generate complete itinerary
        result = travel_agent.generate_complete_itinerary(
            destination=data['destination'],
            origin=data.get('origin'),
            start_date=data['startDate'],
            end_date=data['endDate'],
            budget=data.get('budget'),
            preferences=data.get('preferences', {})
        )
        
        return jsonify(result), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
