const express = require('express');
const db=require('../../db')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const router=express.Router()

router.post('/',async (req,res,next)=>{
    if(
        req.body.email 
        && req.body.questions 
        && req.body.answers
        && req.body.answers.length!==0
        && req.body.answers.length===req.body.questions.length
    ){
        db.query(`INSERT INTO IMOCK.RECORDS VALUES (
            '${req.body.email}',
            '${req.body.timeStamp}',
            NULL,
            '${req.body.job}',
            ${req.body.resume!=='null'?`'${req.body.resume.trim().replace(/'/g, "\\'")}'`:'NULL'},
            ${req.body.jobpost!=='null'?`'${req.body.jobpost.trim().replace(/'/g, "\\'")}'`:'NULL'}
        );`, async (addRecErr, addRecResults, addRecField) => {
            if (addRecErr){
                console.log(addRecErr)
                res.status(200).json({
                    status:"server error"
                })
            }else{
                res.status(200).json({
                    status:"success"
                })
                let query='INSERT INTO IMOCK.ANSWERED_QUESTIONS VALUES '
                for(let i=0; i<req.body.questions.length; i++){
                    let question=req.body.questions[i]
                    let answer=req.body.answers[i]
                    if(answer){
                        let result = await model.generateContent([
                            "give me a 4-sentence helpful review for how I answered the interview question below: \n\n"
                            +"\n--------------QUESTION--------------\n"+question
                            +"\n---------------ANSWER---------------\n"+answer
                        ]);
                        let review=result.response.text().trim().replace(/'/g, "\\'")
                        result = await model.generateContent([
                            "give me a good 4-sentence example answer for the interview question below based on the resume (optional) and job post (optional) below: \n\n"
                            +"\n--------------QUESTION---------------\n"+question
                            +"\n---------------RESUME----------------\n"+req.body.resume
                            +"\n--------------JOB POST---------------\n"+req.body.jobpost
                        ]);
                        let example=result.response.text().trim().replace(/'/g, "\\'")
                        query+=`('${req.body.email}','${req.body.timeStamp}','${question.trim().replace(/'/g, "\\'")}','${answer.trim().replace(/'/g, "\\'")}','${review}','${example}'),`
                    }
                }
                db.query(query.replace(/,([^,]*)$/, ";$1"), (addQueErr, addQueResults, addQueField) => {
                    if(addQueErr){
                        console.log(addQueErr)
                        console.log(query)
                    }

                    db.query(`UPDATE IMOCK.RECORDS SET EXPIRE=60 WHERE EMAIL='${req.body.email}' AND RECORDED_TIME='${req.body.timeStamp}';`,(modRecErr,modRecResults,modRecField)=>{})
                    db.query(`UPDATE IMOCK.ACCOUNTS SET INTERVIEWS=INTERVIEWS-1 WHERE EMAIL = '${req.body.email}';`, (addErr, addResults, addField) => {});
                });
            }
        });
    }
})

module.exports=router;