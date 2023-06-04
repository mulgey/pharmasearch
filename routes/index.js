'use strict';

// Express te router özelliğini kullanıma açtık
const express = require('express');
const router = express.Router();

// Introduce NodeMailer
const nodemailer = require("nodemailer");
let config = require("../public/js/config");

// GET SECTION START

// TEST SECTION
/*
function userIsAllowed(callback) {
  // this function would contain your logic, presumably asynchronous,
  // about whether or not the user is allowed to see files in the
  // protected directory; here, we'll use a default value of "false"
  callback(false);
};

router.get('/protected/data/data.json', function(req, res, next) {
  userIsAllowed(function(allowed) {
    if (allowed) {
      next(); // call the next handler, which in this case is express.static
    } else {
      res.end('You are not allowed!');
    }
  });
});
*/

// GET /
router.get('/', function(req, res, next) {
    return res.render("index");
});

// GET /email
router.get('/email', function(req, res, next) {
    return res.render("email");
});

// GET /typeSearch
router.get('/typeSearch', function(req, res, next) {
  return res.render("typeSearch");
});

// GET /report
router.get('/report', function(req, res, next) {
  return res.render("report");
});

// GET /addStudy
router.get('/addStudy', function(req, res, next) {
  return res.render("addStudy");
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render("about");
});

// GET /test
router.get('/test', function(req, res, next) {
  return res.render("test");
});

// GET /trends
router.get('/trends', function(req, res, next) {
  return res.render("trends");
});

// GET /issue
router.get('/issue', function(req, res, next) {
  return res.render("issue");
});

// GET SECTION ENDS

// Regular expression to validate email address
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST SECTION STARTS
// POST /email
router.post('/email', function(req, res, next) {
  let receiver = req.body.email;
  let studies = req.body.studies;
  let mailSpot;
  let errMessage;

  // Check if the email address is provided and valid
  if (!receiver || !emailRegex.test(receiver) || receiver == undefined) {
    res.locals.Sent = 'Please provide a valid email address.'
    return res.render("email");
  }

  if (!studies || studies == undefined) {
    res.locals.Sent = 'You are not ready to send any study. Selected studies section is empty'
    return res.render("email");
  }

  async function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.pharmasear.ch",
      port: 8889,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.user,
        pass: config.pass
      },
    });

    // verify connection configuration
    transporter.verify(function(error, success) {
      if (error) {
        res.locals.Sent = `Your message could not be sent. If your connection was established, check your firewall and antivirus software settings`;
        return res.render("email");
      } else {
      // send mail with defined transport object
      transporter.sendMail({
        from: '"PharmaSearch E-Mail Service ☕" <mail@pharmasear.ch>', // sender address
        to: receiver, // list of receivers
        subject: "Your List of Selected Studies 📌", // Subject line
        html: `<p>Thank you for using PharmaSearch E-Mail service,</p><p>Your selected studies are listed below:</p><p>------------------------------<br>${studies}<br>------------------------------</p><p>You may contact us directly replying this mail for any questions.</p><p><small>Kind regards,<br>PharmaSearch Team</p></small>`, // html body
      }, (err, info) => {
        if (info) {
          mailSpot = ((info.accepted)[0]); // mail@pharmasear.ch
          return setTimeout(function() {
            if (typeof mailSpot !== undefined) {
            res.locals.Sent = `Your message was sent to ${mailSpot}. Please check your junk/spam folder. You may also add mail@pharmasear.ch to your address list for your future inquiries.`;
            } else {
              res.locals.Sent = `Your message was sent. Please check your junk/spam folder. You may also add mail@pharmasear.ch to your address list for your future inquiries.`;
            }
            res.render("email");  
            }, 2000);            
        } else {
          errMessage = err.response;
          return setTimeout(function() {
            if (typeof errMessage !== undefined) {
              res.locals.Sent = `There has been an error. Please check your e-mail address. Error message: ${errMessage}`;
            } else {
              res.locals.Sent = `There has been an error. Please provide a valid e-mail address`;
            }
            res.render("email");
          }, 2000);
        }
      });
      }
    });    
  }
  return main().catch(console.error);
});


// POST /report
router.post('/report', function(req, res, next) {
  let studyName = req.body.studyName;
  let name = req.body.name;
  let email = req.body.email;
  let problem = req.body.problem;
  let details = req.body.details;

  if (!studyName || studyName == undefined) {
    res.locals.Report = 'There must be a selected item to report us.'
    return res.render("report");
  }

  if (email && !emailRegex.test(email)) {
    res.locals.Report = 'Please provide a valid email address.'
    return res.render("report");
  }

  if (!problem || problem == undefined) {
    res.locals.Report = 'Please pick a classification for your problem'
    return res.render("report");
  }

  async function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.pharmasear.ch",
      port: 8889,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.user,
        pass: config.pass
      },
    });

    // verify connection configuration
    transporter.verify(function(error, success) {
        if (error) {
          res.locals.Report = `Your message could not be sent. If your connection was established, check your firewall and antivirus software settings`;
          return res.render("report");
        } else {
        // send mail with defined transport object
        transporter.sendMail({
          from: '"PharmaSearch Report Service ☕" <mail@pharmasear.ch>', // sender address
          to: "mail@pharmasear.ch", // list of receivers
          subject: "Your Reported Issue 📌", // Subject line
          html: `<b>Study Name:</b> ${studyName} <br><br> <b>Name:</b> ${name} <br><br> <b>Email:</b> ${email} <br><br> <b>Classification:</b> ${problem} <br><br>  <b>Detail:</b> ${details}` // html body
        }, (err, info) => {
          if (info) {
            return setTimeout(function() {
              res.locals.Report = `Thanks for your report! We will get back to you shortly if there is any required detail`;
              res.render("report");
              }, 2000);            
          } else {
            errMessage = err.response;
            return setTimeout(function() {
              res.locals.Report = `There has been an error. Error message: ${errMessage}`;
              res.render("report");
            }, 2000);
          }
        });
        }
    });    
  }
  return main().catch(console.error);

})

// POST /addStudy
router.post('/addStudy', function(req, res, next) {
  let title = req.body.title;
  let studyUrl = req.body.studyUrl;
  let email = req.body.email;
  let studyDetails = req.body.studyDetails;

  if (!studyUrl || studyUrl == undefined) {
    res.locals.StudyAdd = 'Study URL section is required before submitting for review.'
    return res.render("addStudy");
  }

  async function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.pharmasear.ch",
      port: 8889,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.user,
        pass: config.pass
      },
    });

    // verify connection configuration
    transporter.verify(function(error, success) {
        if (error) {
          res.locals.StudyAdd = `Your study could not be sent. If your connection was established, check your firewall and antivirus software settings`;
          return res.render("addStudy");
        } else {
        // send mail with defined transport object
        transporter.sendMail({
          from: '"PharmaSearch AddStudy Service ☕" <mail@pharmasear.ch>', // sender address
          to: "mail@pharmasear.ch", // list of receivers
          subject: "Your Study for Review 📌", // Subject line
          html: `<b>Study Title:</b> ${title} <br><br> <b>Study URL:</b> ${studyUrl} <br><br> <b>Email:</b> ${email} <br><br> <b>Study Details:</b> ${studyDetails}` // html body
        }, (err, info) => {
          if (info) {
            return setTimeout(function() {
              res.locals.StudyAdd = `Thanks for your contribution! We'll add the study to our database as soon as we review, and inform you, if your contact information was provided`;
              res.render("addStudy");
              }, 2000);            
          } else {
            errMessage = err.response;
            return setTimeout(function() {
              res.locals.StudyAdd = `There has been an error. Error message: ${errMessage}`;
              res.render("addStudy");
            }, 2000);
          }
        });
        }
    });    
  }
  return main().catch(console.error);

})

// POST /issue
// *this section is not tested*
router.post('/issue', function(req, res, next) {
  let parameters = req.body.parameters;
  let details = req.body.details;
  let email = req.body.email;
  
  if (!parameters || parameters == undefined) {
    res.locals.myIssue = 'You should use this page after a search, and parameters section should not be empty.'
    return res.render("issue");
  }

  if (!details || details == undefined) {
    res.locals.myIssue = 'Please provide details as your feedback.'
    return res.render("issue");
  }

  async function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.pharmasear.ch",
      port: 8889,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.user,
        pass: config.pass
      },
    });

    // verify connection configuration
    transporter.verify(function(error, success) {
        if (error) {
          res.locals.myIssue = `Your issue could not be sent. If your connection was established, check your firewall and antivirus software settings`;
          return res.render("issue");
        } else {
        // send mail with defined transport object
        transporter.sendMail({
          from: '"PharmaSearch MyIssue Service ☕" <mail@pharmasear.ch>', // sender address
          to: "mail@pharmasear.ch", // list of receivers
          subject: "Your Reported Issue 📌", // Subject line
          html: `<b>Parameters:</b> ${parameters} <br><br> <b>Details:</b> ${details} <b>Email:</b> ${email} <br><br>` // html body
        }, (err, info) => {
          if (info) {
            return setTimeout(function() {
              res.locals.myIssue = `Thanks for your report! We will get back to you shortly if there is any required detail`;
              res.render("issue");
              }, 2000);            
          } else {
            errMessage = err.response;
            return setTimeout(function() {
              res.locals.myIssue = `There has been an error. Error message: ${errMessage}`;
              res.render("issue");
            }, 2000);
          }
        });
        }
    });    
  }
  return main().catch(console.error);

})

// POST SECTION ENDS

module.exports = router;