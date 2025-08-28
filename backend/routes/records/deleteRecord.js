const express = require('express');
const db=require('../../db')

const router=express.Router()

router.post('/',(req,res,next)=>{
    db.query(`DELETE FROM IMOCK.RECORDS WHERE EMAIL = '${req.body.email}' AND RECORDED_TIME = '${req.body.recordedTime}';`, (deleteErr, deleteResults, deleteField) => {
        if (deleteErr){
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