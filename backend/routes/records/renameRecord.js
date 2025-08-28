const express = require('express');
const db=require('../../db')

const router=express.Router()

router.post('/',(req,res,next)=>{
    db.query(`UPDATE IMOCK.RECORDS SET JOB='${req.body.job.trim().replace(/'/g, "\\'")}' WHERE EMAIL='${req.body.email}' AND RECORDED_TIME = '${req.body.recordedTime}';`, (renameErr, renameResults, renameField) => {
        if (renameErr){
            res.status(200).json({
                status:"server error"
            })
        }else{
            res.status(200).json({
                status:"success"
            })

        }
    });
})

module.exports=router;