const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const mainRoutes = require('./routes/mainRoutes')
const postRoutes = require('./routes/postRoutes')
const PORT = 4000

require('dotenv').config({ path: './config/.env' })

// Passport config
require("./config/passport")(passport);

mongoose.connect('mongodb+srv://altin:altin123@cluster0.vmugvu2.mongodb.net/?retryWrites=true&w=majority')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//Use forms for put and delete
app.use(methodOverride("_method"));


// Setup Sessions - stored in MongoDB
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());


//Routes below 
app.use('/', mainRoutes)
app.use('/post', postRoutes)

app.listen(PORT, () => {
    console.log('Server is running, you better catch it!')
})