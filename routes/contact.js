var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

// send email
router.post('/send', function(req, res) {
  // create Reusable Transporter
  console.log('Posting an email with Transporter');
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'montanacodeschool@gmail.com',
      pass: '7bS1LMuJDx2Q'
    }
  });

  var mailOptions = {
    from: 'Ryan <montanacodeschool@gmail.com>', // sender address
    to: 'ryan.jellesed@outlook.com', // list of receivers
    subject: 'Website Submission', // subject line
    text: 'You have a submission with the following details.. Name: ' + req.body.name + 'Email: ' + req.body.email + 'Message: ' + req.body.message, // plaintext body
    html: '<p>You have a submission with the following details.. </p><ul><li>Name: ' + req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.redirect('/');
    } else {
      console.log('Message sent: ' + info.response);
      res.redirect('/');
    }
  });

});

module.exports = router;
