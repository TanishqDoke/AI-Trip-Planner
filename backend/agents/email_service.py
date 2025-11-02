import os
import json
import requests
from jinja2 import Environment, FileSystemLoader, select_autoescape
from datetime import datetime

class EmailService:
    def __init__(self):
        self.api_key = os.getenv('SENDGRID_API_KEY')
        self.sender_email = os.getenv('SENDER_EMAIL')
        self.sender_name = os.getenv('SENDER_NAME', 'CerebroCraft')
        self.base_url = 'https://api.sendgrid.com/v3/mail/send'
        
        # Setup Jinja2 environment
        self.jinja_env = Environment(
            loader=FileSystemLoader('templates'),
            autoescape=select_autoescape(['html', 'xml'])
        )
    
    def send_itinerary_email(self, recipient_email, user_name, itinerary_data):
        """Send formatted itinerary email using SendGrid REST API"""
        try:
            print(f"\n📧 Preparing email for {recipient_email}...")
            
            # Format template data
            start_date_str = itinerary_data.get('dates', {}).get('start')
            end_date_str = itinerary_data.get('dates', {}).get('end')
            
            # Format dates only if they exist
            formatted_start_date = self._format_date(start_date_str) if start_date_str else None
            formatted_end_date = self._format_date(end_date_str) if end_date_str else None
            
            # Build dates string - only if both dates exist
            if formatted_start_date and formatted_end_date:
                dates_string = f"{formatted_start_date} to {formatted_end_date}"
            else:
                dates_string = None
            
            # Format the complete itinerary with activities
            itinerary_text = self._format_complete_itinerary(
                itinerary_data.get('itinerary', []),
                itinerary_data.get('aiItineraryRaw', '')
            )
            
            template_data = {
                'user_name': user_name or 'Traveler',
                'destination': itinerary_data.get('destination', 'Your Destination'),
                'start_date': formatted_start_date,
                'end_date': formatted_end_date,
                'dates_string': dates_string,  # Combined dates string
                'duration': itinerary_data.get('duration', None),
                'budget': itinerary_data.get('budget'),
                'cost_estimates': itinerary_data.get('costEstimates', {}),
                'flights': itinerary_data.get('availableFlights', [])[:3],
                'hotels': itinerary_data.get('availableHotels', [])[:3],
                'itinerary_text': itinerary_text,
                'app_url': os.getenv('FRONTEND_URL', 'http://localhost:5173')
            }
            
            print(f"📝 Rendering email template...")
            print(f"   - Destination: {template_data['destination']}")
            print(f"   - Dates: {template_data['dates_string'] or 'Not provided'}")
            print(f"   - Duration: {template_data['duration']} days" if template_data['duration'] else "   - Duration: Not specified")
            print(f"   - Budget: ₹{template_data['budget']}")
            print(f"   - Itinerary Length: {len(itinerary_text)} characters")
            
            template = self.jinja_env.get_template('itinerary_email.html')
            html_content = template.render(**template_data)
            
            print(f"📨 Creating email payload...")
            
            # Build email payload
            email_payload = {
                "personalizations": [
                    {
                        "to": [
                            {
                                "email": recipient_email,
                                "name": user_name or "Traveler"
                            }
                        ],
                        "subject": f"Your Trip Itinerary to {template_data['destination']} is Ready! ✈️"
                    }
                ],
                "from": {
                    "email": self.sender_email,
                    "name": self.sender_name
                },
                "content": [
                    {
                        "type": "text/html",
                        "value": html_content
                    }
                ]
            }
            
            print(f"🔄 Sending via SendGrid API...")
            
            # Send email using requests library
            headers = {
                'Authorization': f'Bearer {self.api_key}',
                'Content-Type': 'application/json'
            }
            
            response = requests.post(
                self.base_url,
                headers=headers,
                json=email_payload,
                timeout=10
            )
            
            if response.status_code in [200, 202]:
                print(f"✅ Email sent successfully to {recipient_email}")
                print(f"Status Code: {response.status_code}")
                return True
            else:
                print(f"❌ SendGrid API returned status {response.status_code}")
                print(f"Response: {response.text}")
                return False
            
        except requests.exceptions.RequestException as e:
            print(f"❌ Network error sending email: {str(e)}")
            return False
        except Exception as e:
            print(f"❌ Error sending email: {str(e)}")
            import traceback
            traceback.print_exc()
            return False
    
    def _format_date(self, date_string):
        """Format date string to readable format"""
        if not date_string:
            return None
        try:
            date_obj = datetime.strptime(date_string, '%Y-%m-%d')
            return date_obj.strftime('%B %d, %Y')
        except:
            return None
    
    def _format_complete_itinerary(self, itinerary_array, raw_text):
        """Format complete itinerary with all activities and details"""
        
        # First try to use structured itinerary array
        if itinerary_array and isinstance(itinerary_array, list) and len(itinerary_array) > 0:
            formatted = []
            
            for day_idx, day in enumerate(itinerary_array, 1):
                day_title = day.get('day', f'Day {day_idx}')
                day_summary = day.get('day_summary', '')
                schedule = day.get('schedule', [])  # KEY: Get schedule array, not activities
                
                # Add day header
                formatted.append(f"\n{'='*70}")
                formatted.append(f"📋 {day_title}")
                formatted.append(f"{'='*70}")
                
                if day_summary:
                    formatted.append(f"\n📝 Summary: {day_summary}\n")
                
                # Add all schedule items (activities)
                if isinstance(schedule, list) and len(schedule) > 0:
                    for idx, item in enumerate(schedule, 1):
                        if isinstance(item, dict):
                            time = item.get('time', '')
                            name = item.get('name', item.get('activity', ''))
                            item_type = item.get('type', '')
                            details = item.get('details', '')
                            address = item.get('address', '')
                            duration = item.get('duration', '')
                            ticket_pricing = item.get('ticket_pricing', '')
                            
                            # Format the activity
                            formatted.append(f"{idx}. {name}")
                            if time:
                                formatted.append(f"   ⏰ Time: {time}")
                            if item_type:
                                formatted.append(f"   Type: {item_type}")
                            if duration:
                                formatted.append(f"   Duration: {duration}")
                            if details:
                                formatted.append(f"   Details: {details}")
                            if address:
                                formatted.append(f"   Location: {address}")
                            if ticket_pricing:
                                formatted.append(f"   Cost: {ticket_pricing}")
                            formatted.append("")  # Empty line between activities
                        elif isinstance(item, str):
                            formatted.append(f"{idx}. {item}\n")
                else:
                    formatted.append("   No activities planned for this day.\n")
                
                # Add daily cost summary if available
                daily_total = day.get('daily_total_cost', '')
                if daily_total:
                    formatted.append(f"\n💰 Day Total: {daily_total}")
            
            result = '\n'.join(formatted)
            if result.strip():
                print(f"✅ Formatted itinerary with {len(itinerary_array)} days and activities")
                return result
        
        # Fallback to raw text
        if raw_text:
            text = raw_text.strip()
            
            # Remove markdown code blocks
            if text.startswith('```'):
                lines = text.split('\n')
                if len(lines) > 2:
                    text = '\n'.join(lines[1:-1])
            
            if text:
                return text
        
        return "Your complete itinerary details will be available soon."

