const bcrypt=require('bcryptjs')
const crypto=require('crypto');
const nodemailer=require('nodemailer')
const sendGridTransport=require('nodemailer-sendgrid-transport')
const User=require('../models/user')

const transporter=nodemailer.createTransport(sendGridTransport({
    auth:{
        api_key:'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'
    }
}))

exports.getLogin=(req, res, next)=>{
    let message=req.flash('error')
    if(message.length>0){
        message=message[0];
    }else{
        message=null;
    }
    console.log(req.session.isLoggedIn)
    res.render('login', {
        path:'/login',
        isAuthenticated:false,
        errorMessage:message
    })
}

exports.getSignUp=(req, res, next)=>{
    let message=req.flash('error')
    if(message.length>0){
        message=message[0]
    }else{
        message=null
    }
    res.render('signup', {
        path:'/signup',
        isAuthenticated:false,
        errorMessage:message
    })
}

exports.postLogin=(req, res, next)=>{
    const email=req.body.email
    const password=req.body.password
    User.findOne({
        email:email
    })
    .then(user=>{
        if(!user){
            req.flash('error', 'Incorrect Gmail')
            return res.redirect('/login')
        }else{
            req.flash('error', 'Invalid Password')
        }
        bcrypt.compare(password, user.password)
        .then(doMatch=>{
            if(doMatch){
                req.session.isLoggedIn=true;
                req.session.user=user;
                return req.session.save(err=>{
                    console.log(err);
                    res.redirect('/')
                })
            }
            res.redirect('/login')
        })
        .catch(err=>{
            console.error(err)
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.postLogout=(req, res, next)=>{
    req.session.destroy(err=>{
        console.log(err)
        res.redirect('/')
    })
}

exports.postSignUp=(req, res, next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const confirmPassword=req.body.confirmPassword
    User.findOne({
        email:email
    })
    .then(userDoc=>{
        if(userDoc){/* //if(userDoc) means that when u r signing up if the email u have applied exists already then u will be redirected back to the sign up page */
            req.flash('error', 'email already taken try a new one')
            return res.redirect('/signup')
        }
        return bcrypt.hash(password, 12)
        .then(hashedPassword=>{
            const user=new User({
                name:name,
                email:email,
                password:hashedPassword
            })
            return user.save()
        })
        .then(result=>{
            res.redirect('/login');
        })
    })
    .catch(err=>{
        console.error(err);
    })
}

exports.getReset=(req, res, next)=>{
    let message=req.flash('error')
    if(message.length>0){
        message=message[0];
    }else{
        message=null;
    }
    res.render('reset', {
        path:'/reset',
        errorMessage:message
    })
}

exports.postReset=(req, res, next)=>{
    crypto.randomBytes(32, (error, buffer)=>{
        if(error){//if the entered pin no. is incorrect then it goes back again to reset
            console.log(error);
            res.redirect('/reset')
        }
        const token=buffer.toString('hex')
        const email=req.body.email;
        User.findOne({
            email:email
        })
        .then(user=>{
            if(!user){
                req.flash('error', 'invalid email')
                res.redirect('/reset')
            }
            user.resetToken=token;
            user.resetTokenExpiration=Date.now() + 360000;
            return user.save()
        })
        .then(result=>{
            req.flash('error', 'the password has been sent to your respective email id')
            res.redirect('/reset')
            transporter.sendMail({
                to:email,
                from:'saifullahkhan@cmr.ac.in',
                subject:'password reset',
                html:
                `<p>you had requested a password reset</p>
                <p>click this <a href="http://localhost:3000/reset/${token}" >link</a> to reset password</p>
                `
            })
        })
        .catch(err=>{
            console.log(err)
        })
    })
}

exports.getNewPassword=(req, res, next)=>{
    const token=req.params.token;
    User.findOne({resetToken:token, resetTokenExpiration:{$gt:Date.now()}})
    .then(user=>(
        res.render('new-password', {
            path:'/new-password',
            userId:user._id.toString(),
            passwordToken:token
        })
    ))
    .catch(err=>{console.log(err)})
}

exports.postNewPassword=(req, res,next)=>{
    const passwordToken=req.body.passwordToken;
    const userId=req.body.userId;
    const newPassword=req.body.password;
    let resetUser;
    User.findOne({resetToken:passwordToken, resetTokenExpiration:{$gt:Date.now()}, _id:userId})
    .then(user=>{
        resetUser=user
        return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword=>{
        resetUser.newPassword=hashedPassword;
        resetUser.userId=undefined;
        resetUser.passwordToken=undefined;
        return resetUser.save();
    })
    .then(result=>res.redirect('/login'))
    .catch(err=>{console.log(err)});
}