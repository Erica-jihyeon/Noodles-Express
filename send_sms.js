require('dotenv').config();
// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
// https://www.twilio.com/docs/sms/quickstart/node
//npm install twilio
//npm install dotenv

const send_sms = function(message, fromPhone, toPhone) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioFromPhone = process.env.TWILIO_FROM_NUMBER;


  const client = require('twilio')(accountSid, authToken);
  client.messages
    .create({
      body: `${message}`,
      from: `+${twilioFromPhone}`,
      to: `${toPhone}`
    })
    .then(message => {
      console.log(message.sid)
      console.log(`Message sent to : ${message.to} content : ${message.body}`)
    });
}

module.exports = { send_sms };
