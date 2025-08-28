const express = require('express');
const db=require('../../db')

const router=express.Router()

router.post('/',(req,res,next)=>{
    db.query(`SELECT * FROM IMOCK.ANSWERED_QUESTIONS WHERE EMAIL = '${req.body.email}' AND RECORDED_TIME = '${req.body.recordedTime}';`, (questionsErr, questionsResults, questionsField) => {
        if (questionsErr){
            res.status(200).json({
                status:"server error"
            })
        }else{
            res.status(200).json({
                status:"success",
                questions:questionsResults.map((obj)=>({
                    question: obj.QUESTION,
                    answer: obj.ANSWER,
                    review: obj.REVIEW,
                    example: obj.EXAMPLE
                }))
            })

        }
    });
})

module.exports=router;