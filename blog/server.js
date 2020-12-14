const path = require('path')
const serverless=require('serverless-http');
const compression = require('compression')
const multer = require('multer')
const csrf = require('csurf')
const flash = require('connect-flash')
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

const MongoDB_URI = 'mongodb+srv://turd_waffle:SaifKhan@cluster0.lltqs.mongodb.net/blogworm?';
const csrfProtection = csrf({})

const app = express();
const store = new MongoDBStore({
    uri: MongoDB_URI,
    collections: 'sessions'
})

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
}) //this is used to store and fetch the name of the file
//mimetype is a feature that helps us to recognize the file type
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const errorController = require('./controllers/error')
const User = require('./models/user');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'))
app.use(session({
    secret: 'my save',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(flash());
app.use(csrfProtection)

const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
    if (!req.session.user) {
        return next()
    }
    User.findById(req.session.user._id)
        .then(result => {
            req.user = result
            next()
        })
        .catch(err => {
            console.log(err)
        })
})

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use('./netlify/functions', adminRoutes)
app.use(authRoutes);
app.use(errorController.get404)

mongoose.connect(MongoDB_URI, {
        useNewUrlParser: true
    })
    .then(result => {
        app.listen(process.env.PORT || 3000, function () {
            console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
        });
    })
    .catch(err => {
        console.log(err)
    })

module.exports.handler=serverless(app)