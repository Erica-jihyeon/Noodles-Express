require('dotenv').config();
// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Noodles Express: We have received your order! It will be ready for pick up in 20 mins. See you soon!',
     from: '+17787450500',
     to: '+17786813760'
   })
  .then(message => console.log(message.sid));
