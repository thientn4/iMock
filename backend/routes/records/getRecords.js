const express = require('express');
const db=require('../../db')

const router=express.Router()

router.post('/',(req,res,next)=>{
    db.query(`SELECT * FROM IMOCK.RECORDS WHERE EMAIL = '${req.body.email}';`, (recordsErr, recordsResults, recordsField) => {
        if (recordsErr){
            res.status(200).json({
                status:"server error"
            })
        }else{
            res.status(200).json({
                status:"success",
                records:recordsResults.map((obj)=>({
                    email: obj.EMAIL,
                    recordedTime: obj.RECORDED_TIME,
                    expire: obj.EXPIRE,
                    job: obj.JOB,
                    resume: obj.RESUME,
                    jobpost: obj.JOBPOST
                }))
            })

        }
    });
})

module.exports=router;