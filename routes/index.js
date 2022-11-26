var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res, next) {
	return res.render('register.ejs');
});


router.post('/', function (req, res, next) {
	console.log(req.body);
	var personInfo = req.body;


	if (!personInfo.email || !personInfo.firstn || !personInfo.lastn || !personInfo.psw || !personInfo.psw_repeat) {
		res.send();
	} else {
		if (personInfo.psw == personInfo.psw_repeat) {

			User.findOne({ email: personInfo.email }, function (err, data) {
				if (!data) {
					var c;
					User.findOne({}, function (err, data) {

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						} else {
							c = 1;
						}

						var newPerson = new User({
							unique_id: c,
							firstn: personInfo.firstn,
							lastn: personInfo.lastn,
							email: personInfo.email,
							mobile: personInfo.mobile,
							city: personInfo.city,
							dob: personInfo.dob,
							gender: personInfo.gender,
							religion: personInfo.religion,
							aadhar: personInfo.aadhar,
							pan: personInfo.pan,
							psw: personInfo.psw,
							psw_repeat: personInfo.psw_repeat
						});

						newPerson.save(function (err, Person) {
							if (err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({ _id: -1 }).limit(1);
					res.send({ "Success": "You are regestered,You can login now." });
				} else {
					res.send({ "Success": "Email is already used." });
				}

			});
		} else {
			res.send({ "Success": "password is not matched" });
		}
	}
});

router.get('/login', function (req, res, next) {
	return res.render('index.ejs');
});



router.post('/login', function (req, res, next) {
	//console.log(req.body);
	User.findOne({ email: req.body.email }, function (err, data) {
		if (data) {

			if (data.psw == req.body.password) {
				//console.log("Done Login");
				req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.send({ "Success": "Success!" });

			} else {
				res.send({ "Success": "Wrong password!" });
			}
		} else {
			res.send({ "Success": "This Email Is not regestered!" });
		}
	});
});

router.get('/profile', function (req, res, next) {
	console.log("profile");
	User.findOne({ unique_id: req.session.userId }, function (err, data) {
		console.log("data");
		console.log(data);
		if (!data) {
			res.redirect('/login');
		} else {
			//console.log("found");
			return res.render('profile.ejs', { "fname": data.firstn, "lname": data.lastn, "email": data.email, "mobile": data.mobile, "city": data.city, "dob": data.dob, "gender": data.gender, "religion": data.religion,"aadhar": data.aadhar, "pan": data.pan  });
		}
	});
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
		// delete session object
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/login');
			}
		});
	}
});


module.exports = router;
