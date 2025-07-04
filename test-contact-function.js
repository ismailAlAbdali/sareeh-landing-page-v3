const { handler } = require('./netlify/functions/contact');
require('dotenv').config({ path: '.env.local' });

// Load environment variables from .env.local
const {
  NEXT_PUBLIC_SMTP_HOST,
  NEXT_PUBLIC_SMTP_PORT,
  NEXT_PUBLIC_SMTP_USER,
  NEXT_PUBLIC_SMTP_PASS,
  NEXT_PUBLIC_MAIL_TO
} = process.env;

// Set environment variables for the function (without NEXT_PUBLIC_ prefix)
process.env.SMTP_HOST = NEXT_PUBLIC_SMTP_HOST;
process.env.SMTP_PORT = NEXT_PUBLIC_SMTP_PORT;
process.env.SMTP_USER = NEXT_PUBLIC_SMTP_USER;
process.env.SMTP_PASS = NEXT_PUBLIC_SMTP_PASS;
process.env.MAIL_TO = NEXT_PUBLIC_MAIL_TO;
process.env.NODE_ENV = 'development';

// Validate environment variables
console.log('🔧 Environment Variables Check:');
console.log('SMTP_HOST:', NEXT_PUBLIC_SMTP_HOST ? '✅ Set' : '❌ Missing');
console.log('SMTP_PORT:', NEXT_PUBLIC_SMTP_PORT ? '✅ Set' : '❌ Missing');
console.log('SMTP_USER:', NEXT_PUBLIC_SMTP_USER ? '✅ Set' : '❌ Missing');
console.log('SMTP_PASS:', NEXT_PUBLIC_SMTP_PASS ? '✅ Set' : '❌ Missing');
console.log('MAIL_TO:', NEXT_PUBLIC_MAIL_TO ? '✅ Set' : '❌ Missing');

if (!NEXT_PUBLIC_SMTP_HOST || !NEXT_PUBLIC_SMTP_PORT || !NEXT_PUBLIC_SMTP_USER || !NEXT_PUBLIC_SMTP_PASS || !NEXT_PUBLIC_MAIL_TO) {
  console.error('❌ Missing required environment variables. Please check your .env.local file.');
  process.exit(1);
}

// Test data
const testData = {
  businessname: 'Test Business',
  contactname: 'Test Contact',
  email: 'test@example.com',
  phone: '+96812345678',
  industry: 'Retail',
  otherindustry: '',
  language: 'en'
};

// Mock event
const mockEvent = {
  httpMethod: 'POST',
  body: JSON.stringify(testData)
};

// Mock context
const mockContext = {};

async function testContactFunction() {
  console.log('🧪 Testing Contact Function...');
  console.log('📧 Test Data:', testData);
  
  try {
    const result = await handler(mockEvent, mockContext);
    
    console.log('\n📤 Function Response:');
    console.log('Status Code:', result.statusCode);
    console.log('Headers:', result.headers);
    console.log('Body:', JSON.parse(result.body));
    
    if (result.statusCode === 200) {
      console.log('\n✅ Function executed successfully!');
    } else {
      console.log('\n❌ Function returned error status');
    }
    
  } catch (error) {
    console.error('\n💥 Function execution failed:', error);
  }
}

// Test with Arabic data
async function testArabicFunction() {
  console.log('\n🧪 Testing Contact Function (Arabic)...');
  
  const arabicTestData = {
    ...testData,
    businessname: 'شركة تجريبية',
    contactname: 'مستخدم تجريبي',
    language: 'ar'
  };
  
  const arabicEvent = {
    httpMethod: 'POST',
    body: JSON.stringify(arabicTestData)
  };
  
  try {
    const result = await handler(arabicEvent, mockContext);
    
    console.log('\n📤 Arabic Function Response:');
    console.log('Status Code:', result.statusCode);
    console.log('Body:', JSON.parse(result.body));
    
  } catch (error) {
    console.error('\n💥 Arabic function execution failed:', error);
  }
}

// Run tests
async function runTests() {
  await testContactFunction();
  await testArabicFunction();
  console.log('\n🏁 Tests completed!');
}

runTests(); 