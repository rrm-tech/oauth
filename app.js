const express = require('express'),
	app = express(),
	passport = require('passport'),
	mongoose = require('mongoose'),
	session  = require('express-session'),
	bodyParser = require('body-parser'),
	facebookRoutes = require('./controller/facebook.routes'),
	localUserRoutes = require('./controller/localuser.routes'),
	key = require('./key');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(session({ secret: key.secret }));
app.use(passport.initialize());
app.use(passport.session());


require('./controller/facebook.setup');
mongoose.connect('mongodb://localhost/auth1');

app.get('/',(req,res)=>{
	res.sendFile(__dirname + '/views/index.html');
})

app.use('/auth/facebook/',facebookRoutes); //localhost:3000/auth/facebook/<Route>
app.use('/auth/localuser/',localUserRoutes); //localhost:3000/auth/localuser/<Route>


app.get('/homepage',(req,res)=>{
	// req.session.localUser 
	// req.user 
	if(req.user) {
		res.send(req.user);
	}else if(req.session.localUser){
		res.send(req.session.localUser);
	}else{
		res.redirect('/homepage');
	}
})



app.listen(3000,()=>{
	console.log('listening on http://localhost:3000/');
})