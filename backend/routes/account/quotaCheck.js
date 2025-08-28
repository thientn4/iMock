const db=require('../../db')
module.exports = function quotaCheck(email, url) {
    return new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM IMOCK.ACCOUNTS WHERE EMAIL = '${email}';`, (accountErr, accountResults, accountField) => {
            if (accountErr){
                return resolve(true)
            }else{
                if(accountResults.length>0){
                    return resolve(
                        (accountResults[0].INTERVIEWS===0 && url==='/records/add') ||
                        (accountResults[0].DOCUMENTS===0 && url==='/questions/addDocument')
                    )
                }else{
                    return resolve(true)
                }
            }
        });
    })
}