const express=require('express')
const cookieParser=require('cookie-parser')
const passport=require('passport')
const bodyParser = require('body-parser')
const session=require('express-session')
const MongoStore=require('connect-mongodb-session')(session)
const mongoose=require('mongoose')
const cors=require('cors');
const csurf=require('csurf');
const mongoUri="mongodb://localhost/projects"
const jwt=require('jsonwebtoken')

const port=process.env.PORT || 8080

const app = express();

const SignUp=require('./database/signup')
const auth=require('./routes/routes')
const crud=require('./routes/crud')



/* const store=new MongoStore({
    uri:mongoUri,
    collections:'mongo-sessions'
})

store.on('error', err=>console.log(err)) */

//connecting to database
mongoose.connect(mongoUri,{
    useUnifiedTopology:true, 
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})
.then(()=>{
    console.log('connected to database');
})
.catch(err=>{
    console.log("connection error : "+err)
    return;
})
const db=mongoose.connection;
db.on('err', err=>console.log(err))
db.on('open', ()=>{console.log('connected to database')})

app.use(cors())
app.use(cors(
    {
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      allowedHeaders:'Content-Type, Authorization, X-Requested-With',
      credentials:true
    }
));//securing cors to only one host

//allowing cookie credentials to pass through
app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

app.use(bodyParser.urlencoded({extended:true}))//returns urlencoded middleware, and checks for content-type rest-api requests
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/auth', auth);
app.use('/', crud);

app.listen(port, ()=>{
    console.log('connected to port '+port);
})