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

app.use(bodyParser.urlencoded({extended:true}))//returns urlencoded middleware, and checks for content-type rest-api requests
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/auth', auth);
app.use('/', crud);

app.listen(port, ()=>{
    console.log('connected to port '+port);
})