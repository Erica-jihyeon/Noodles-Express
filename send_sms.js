require('dotenv').config();
// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
// https://www.twilio.com/docs/sms/quickstart/node
//npm install twilio
//npm install dotenv

//Use the following line to call this function
//const { send_sms } = require('./send_sms');
//param1 -> message = string, the message you want to send
//param2 -> toPhone = string, must be 10 digit, no need +1 , phone number you want to send to
//e.g. send_sms("This is Noodles Express, +17781234567")


const send_sms = function(message, toPhone) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioFromPhone = process.env.TWILIO_FROM_NUMBER;


  const client = require('twilio')(accountSid, authToken);
  client.messages
    .create({
      body: `${message}`,
      from: `+1${twilioFromPhone}`,
      to: `+1${toPhone}`
    })
    .then(message => {
      console.log(message.sid)
      console.log(`Message sent to : ${message.to} | Content : ${message.body}`)
    });
}

module.exports = { send_sms };
