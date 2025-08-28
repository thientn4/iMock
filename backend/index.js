const express = require('express');
const cors = require('cors');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
app.use(express.json()); // for express to read json body
app.use(cors({
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}));

////////////////////// API GATEWAY ////////////////////
app.use('/',async (req, res, next) => {
    let token=req.headers.token;
    if(!token)return res.status(200).json({ status: 'token missing' });
    try{
        try{
            await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
        }catch(googleErr){
            if(!(googleErr.toString().includes("used too late")))return res.status(200).json({ status: 'invalid token' });
        }
        let decoded = jwt.decode(token, { complete: true })
        if(Date.now()-decoded.payload.iat*1000>(24*60*60*1000))return res.status(200).json({ status: 'session expired' }); // expire token after 1 day
        req.body.email=decoded.payload.email

        /////////////////////////////////////// CHECK ACCOUNT QUOTA LIMIT /////////////////////////////////////////////
        if(req.url==='/records/add' || req.url==='/questions/addDocument'){
            const quotaCheck = require('./routes/account/quotaCheck'); /// must be initialized in this scope to avoid db connection being established twice and cause error
            let result=await quotaCheck(decoded.payload.email, req.url)
            if(result)return res.status(200).json({ status: 'unauthorized' });
            else req.next()
        }else{
            req.next()
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


        //req.next()
    }catch (err) { 
        return res.status(200).json({ status: 'invalid token' });
    }
})
/////////////////////// SERVICES //////////////////////
app.use('/account/account',require("./routes/account/account"))
app.use('/questions/get',require("./routes/questions/getQuestions"))
app.use('/questions/addDocument',require("./routes/questions/addDocument"))
app.use('/records/add',require("./routes/records/addRecord"))
app.use('/records/get',require("./routes/records/getRecords"))
app.use('/records/delete',require("./routes/records/deleteRecord"))
app.use('/records/questions',require("./routes/records/getRecord"))
app.use('/records/rename',require("./routes/records/renameRecord"))

const port=3001
app.listen(port, () => {
    console.log(`Server listening on port 3001`);
});