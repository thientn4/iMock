const express = require('express');
const db=require('../../db')
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const router=express.Router()

router.post('/',async (req,res,next)=>{
    if(req.body.email && req.body.document){
        db.query(`DELETE FROM IMOCK.USER_QUESTIONS WHERE EMAIL = '${req.body.email}' AND QUESTION_TYPE = ${req.body.document.type==='resume'?1:2};`, async (deleteErr, deleteResults, deleteField) => {
            if (deleteErr){
                res.status(200).json({
                    status:"server error"
                })
            }else{
                try{
                    const result = await model.generateContent([
                        "give me a list of "
                        +10
                        +" detailed targeting interview question based on information below, each question in a new line with number in front of them (question only, no description, no header):\n\n"
                        +req.body.document.content]);
                    let questions = result.response.text()
                        .split("\n")
                        .map(question => question.trim().replace(/'/g, "\\'"))
                        .filter(str => /^\d+\./.test(str))
                        .map(question => question.substring(question.indexOf(".")+1).trim())
                    if(questions.length!==10){
                        res.status(200).json({
                            status:"server error"
                        })
                        return
                    }
                    let query='INSERT INTO IMOCK.USER_QUESTIONS VALUES '
                    for(let i=0; i<questions.length; i++){
                        query+=`('${req.body.email}','${questions[i]}',${req.body.document.type==='resume'?1:2})`
                        query+=(i===questions.length-1?';':',\n')
                    }
                    db.query(query, (addErr, addResults, addField) => {
                        if (addErr){
                            res.status(200).json({
                                status:"server error"
                            })
                        }else{
                            res.status(200).json({
                                status:"success"
                            })
                            db.query(`UPDATE IMOCK.ACCOUNTS SET DOCUMENTS=DOCUMENTS-1 WHERE EMAIL = '${req.body.email}';`, (addErr, addResults, addField) => {});
                            db.query(`UPDATE IMOCK.ACCOUNTS SET ${req.body.document.type==='resume'?'RESUME':'JOBPOST'}='${req.body.document.content.trim().replace(/'/g, "\\'")}' WHERE EMAIL = '${req.body.email}';`, (addErr, addResults, addField) => {});
                        }
                    });
                }catch(err){
                    res.status(200).json({
                        status:"server error"
                    })
                }
            }
        });
    }
    else{
        res.status(200).json({
            status:"server error"
        })
    }
})

module.exports=router;