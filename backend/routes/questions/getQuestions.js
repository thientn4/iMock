const express = require('express');
const db=require('../../db')

const router=express.Router()

router.post('/',(req,res,next)=>{
    db.query(`SELECT * FROM IMOCK.USER_QUESTIONS WHERE EMAIL = '${req.body.email}';`, (questionsErr, questionsResults, questionsField) => {
        if (questionsErr){
            res.status(200).json({
                status:"server error"
            })
        }else{
            res.status(200).json({
                status:"success",
                questions:questionsResults.map((obj)=>({
                    question: obj.QUESTION,
                    questionType: obj.QUESTION_TYPE
                }))
            })

        }
    });
})

module.exports=router;