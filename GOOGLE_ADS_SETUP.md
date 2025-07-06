# Google Ads Setup for Demo Form Tracking

## Overview
This landing page includes Google Ads conversion tracking for demo form submissions. The tracking is implemented to measure the effectiveness of your Google Ads campaigns.

## Current Implementation

### 1. Google Analytics Setup
- Google Analytics is already configured with ID: `G-0EGFVC64LD`
- Located in `app/layout.tsx` in the `GoogleAnalytics` component

### 2. Demo Form Conversion Tracking
- Conversion tracking is implemented in `app/[lang]/thank-you/page.tsx`
- Tracks when users successfully submit a demo request and reach the thank you page
- Currently uses a placeholder conversion ID

### 3. Conversion Flow
1. User fills out demo form
2. Form submits successfully
3. User is redirected to thank you page
4. Google Ads conversion fires on thank you page load
5. Conversion is recorded in Google Ads

## Setup Instructions

### Step 1: Get Your Google Ads Conversion ID
1. Log into your Google Ads account
2. Go to Tools & Settings > Conversions
3. Create a new conversion action for "Demo Form Submission"
4. Copy the conversion ID (format: AW-XXXXXXXXXX/XXXXXXXXXX)

### Step 2: Update the Conversion ID
1. Open `app/[lang]/thank-you/page.tsx`
2. Find line 42 with the comment `// TODO: Replace with your actual Google Ads conversion ID`
3. Replace `'AW-1234567890/ABC123DEF456'` with your actual conversion ID

### Step 3: Test the Conversion Tracking
1. Submit a demo form on your website
2. Verify you're redirected to the thank you page
3. Check Google Ads > Tools & Settings > Conversions to see if the conversion is recorded
4. Verify in Google Analytics that the event is being tracked

## URL Structure for Campaigns

### Main Landing Page URLs:
- **English**: `https://sareeh.omancloud.com/en`
- **Arabic**: `https://sareeh.omancloud.com/ar`

### Thank You Page URLs (for conversion tracking):
- **English**: `https://sareeh.omancloud.com/en/thank-you`
- **Arabic**: `https://sareeh.omancloud.com/ar/thank-you`

### Campaign URLs with UTM Parameters:
```
https://sareeh.omancloud.com/en?utm_source=google&utm_medium=cpc&utm_campaign=demo_campaign&utm_content=hero_button
```

## Security Features

### Demo Request Flow
1. User fills out demo form
2. Form data is saved to database
3. Email notifications are sent to admin and user
4. User is redirected to thank you page
5. Google Ads conversion is tracked
6. User can optionally contact via WhatsApp
7. **No direct app download** - all access is controlled by your team

### Benefits of This Approach
- ✅ Secure: No unauthorized access to the system
- ✅ Trackable: Full conversion tracking for Google Ads
- ✅ Professional: Controlled demo process
- ✅ Scalable: Easy to manage multiple demo requests
- ✅ Better Conversion Tracking: Dedicated thank you page for accurate measurement

## Conversion Tracking Details

### What Gets Tracked
- Form submission success (thank you page load)
- Request number for tracking
- Business name and contact details
- Industry information
- Currency: OMR (Omani Rial)
- Value: 1.0 (can be adjusted based on your business value)

### Customization Options
You can modify the conversion tracking in `app/[lang]/thank-you/page.tsx`:

```javascript
window.gtag('event', 'conversion', {
  'send_to': 'YOUR_CONVERSION_ID',
  'value': 1.0, // Adjust based on your business value
  'currency': 'OMR',
  'transaction_id': requestNumber
});
```

## Development vs Production

### Development Mode
- Uses local API route (`/api/contact`)
- Logs form data to console
- Simulates email sending
- Perfect for testing

### Production Mode
- Uses Netlify functions (`/.netlify/functions/contact`)
- Sends actual email notifications
- Saves data to database
- Full functionality

## Troubleshooting

### Conversion Not Tracking
1. Check if the conversion ID is correct
2. Verify Google Analytics is loading properly
3. Check browser console for any JavaScript errors
4. Ensure the demo form redirects to thank you page successfully

### Google Analytics Not Loading
1. Check if the GA ID in `app/layout.tsx` is correct
2. Verify the script is loading in browser dev tools
3. Check for any ad blockers that might be blocking GA

### Form Not Submitting
1. Check if you're in development mode (uses local API)
2. Verify the form validation is working
3. Check browser console for any errors

## Support
For technical support with Google Ads setup, contact your Google Ads representative or refer to Google's official documentation. 