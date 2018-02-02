const router = require('express').Router();
const axios = require('axios');

const { convertDate } = require('./utils');

const token = process.env.TOKEN || '';

const apiUrl = `https://api.telegram.org/bot${token}/sendMessage`;

/**
 * Send message to Telegram -> apiUrl
 * @param  {Object} res Response
 * @param  {Object} message Incoming message
 * @param  {String} text
 */
function sendMessage(res, message, text) {
  axios.post(apiUrl, {
    chat_id: message.chat.id,
    text,
  })
  .then(() => {
    console.log('Message sent!');
    return res.end();
  })
  .catch(err => {
    console.log('Message sending error!');
    return res.end();
  });
  return res.end();
}

/**
 * /message route > Telegram send webhook to this route
 * @param  {Object} req Request
 * @param  {Object} res Response
 */
router.post('/message', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.end();
  }

  if (message.text) {

    if (message.text.match(/help/g) || message.text.match(/start/g)) {
      const helpText = `خوش آمدید
      برای استفاده از این بات میتوانید برای تبدیل تاریخ هجری شمسی به میلادی و برعکس تاریخ را به صورت سال-ماه-روز وارد کنید مانند
      2017-10-21
      `;
      sendMessage(res, message, helpText);
    } else if (message.text.match(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/g)) {
      const convertedDate = convertDate(message.text);
      sendMessage(res, message, convertedDate);
    } else {
      res.end();
    }

  } else {
    return res.end();
  }

});


/**
 * Home page route
 * @param {Object} req Request
 * @param {Object} res Response
 */
router.get('/', (req, res) => {
  res.send('Telegram bot');
});

module.exports = router;
