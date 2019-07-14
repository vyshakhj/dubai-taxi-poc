const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const QRCode = require('qrcode')

mongoose.connect('mongodb://localhost:27017/test')
  .then(() => console.log('Connected to database!'))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'angular')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/customer/bookings', (req, res) => {
  const booking = req.body;
  QRCode.toDataURL(
    `BookingType: ${booking.bookingType}
    Destination: ${booking.destination}
    BookingId: BK001/295`,
    { errorCorrectionLevel: 'H' })
    .then(code => {
      console.log(code);
      res.status(201).json({
        message: 'Booking added successfully!',
        qrCode: code
      });
    })
    .catch(err => {
      console.error(err)
    })
});

app.use('/', (req, res, next) => {
  res.sendfile(path.join(__dirname, 'angular', 'index.html'))
});

module.exports = app;
