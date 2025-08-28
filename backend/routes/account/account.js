const express = require('express');
const db=require('../../db')

const router=express.Router()

router.post('/',(req,res,next)=>{
    db.query(`SELECT * FROM IMOCK.ACCOUNTS WHERE EMAIL = '${req.body.email}';`, (accountErr, accountResults, accountField) => {
        if (accountErr){
            res.status(200).json({
                status:"server error"
            })
        }else{
            let documents=4
            let interviews=2
            let resume=null
            let jobpost=null
            if(accountResults.length>0){
                documents=accountResults[0].DOCUMENTS
                interviews=accountResults[0].INTERVIEWS
                resume=accountResults[0].RESUME
                jobpost=accountResults[0].JOBPOST
            }else{
                db.query(`INSERT INTO IMOCK.ACCOUNTS VALUES ('${req.body.email}',4,2,NULL,NULL);`, (addErr, addResults, addField) => {});
            }
            res.status(200).json({
                status:"success",
                email:req.body.email,
                documents:documents,
                interviews:interviews,
                resume:resume,
                jobpost:jobpost
            })

        }
    });
})

module.exports=router;