const SignUp=require('../database/signup');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


exports.getUsers=(req, res)=>{
    SignUp.find()
    .then(result=>{
        console.log(result);
        res.json(result)
        console.log(result.length+' users signed in');
    })
    .catch(err=>console.log(err));
}

exports.PostUsers=async (req, res)=>{
    try{
        const salt=await bcrypt.genSaltSync(10)
        const hashedPassword=await bcrypt.hash(req.body.password, salt);
        const user=new SignUp({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,
            gender:req.body.gender,
        })
        const newUser=await user.save()
        console.log(newUser)
        res.json(newUser)
    }catch(err){
        res.status(500).json('email has been taken, try a different email')
        console.log('email has been taken try a different email');
        console.log(err)
        return;
    }
}
/* 
exports.verifyToken=async (req, res)=>{
    try{
        await piGenerator.findOne({email:req.use.email}).exec((err, user)=>{

        })
    }
} */


exports.find=async(req, res, next)=>{
    try{
        await SignUp.findById(req.params.id).exec((err, user)=>{
            if(err){return res.status(500).json({message:err})}
            if(user==null){return res.status(403).json({message:'user not found'})}
            res.user=user;
            next()
        })
    }catch(err){
        res.json(err).status(500)
        console.log(err)
    }   
}

exports.loggedIn=async(req, res)=>{
    try{
        await SignUp.findById(req.params.id).exec((err, user)=>{
            if(user){
                res.json('i am user')
            }
            console.log(err)
        })
    }catch(e){
        console.log(e)
    }
}

exports.patchUser=async(req, res)=>{
    if(req.body.name!==null){
        res.user.name=req.body.name
    }
    if(req.body.email!==null){
        res.user.email=req.body.email
    }
    if(req.body.gender!==null){
        res.user.gender=req.body.gender
    }
    try{
        const user=await res.user.save()
        res.json(user)
    }catch(err){
        res.status(500).send(err)
        console.log(err+'err')
    }
}

//res.user taken from the find middleware
exports.deleteUser=async (req, res)=>{
    try{
        const passwordIsValid=bcrypt.compareSync(req.body.password, res.user.password)
        if(passwordIsValid){
            await res.user.remove() 
            res.json({message:'deleted user'})
        }
        res.send({message:'Invalid Password'})
    }catch(err){
        res.status(500).json({message:err})
    }
}

exports.postLogin=async(req, res)=>{
    // allows entry of form type text for verification
    // so we can use the entered text for user.password form
        res.setHeader("Content-Type", "text/html");
        try{
            await SignUp.findOne({email:req.body.email}).exec((err, user)=>{
                if(err)return res.status(500).send(err)
                if(!user)return res.status(403).json('user not found')
                const passwordIsValid=bcrypt.compareSync(req.body.password, user.password)
                if(!passwordIsValid)return res.status(403).json({
                    message:'Invalid Password',
                    AccessToken:null
                })
                AccessToken=jwt.sign({id:user._id}, 'gludius-maximus', {expiresIn:'1h'})
                res.cookie('authcookie', AccessToken, { maxAge:'900000', httpOnly:true })
                res.status(200).json({
                    name:user.name,
                    email:user.email,
                    password:user.password,
                    gender:user.gender,
                    AccessToken:AccessToken
                })
            })

       }catch(err){
            console.log(err)
            res.send(err)
        }
    }

exports.updateUserPassword=async (req, res)=>{
    res.setHeader('Content-Type', 'text/html')
    try{
        const currentEmail=req.body.email;
        let currentPassword=req.body.password;
        await SignUp.findOne({email:currentEmail, password:currentPassword}, (err, user)=>{
            if(err){
                res.status(500).send({message:err+'err'})
                return;
            }
            currentPassword=user.password
            user.save(err=>{
                if(err){
                    res.status(500).send({message:err+'err'})
                    return;
                }
                res.status(200).send({message:'user password has been successfully updated'})
            })
        })
    }catch(err){
        res.status(500).send({message:err+'err'})
    }
}

