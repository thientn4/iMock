import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import logo from"../assets/logo.png"
import blue_logo from"../assets/blue_logo.png"
import cancel_btn from"../assets/cancel_btn.png"
import loading from"../assets/loading.gif"
import account_blue_btn from"../assets/account_blue_btn.png"
import account_btn from"../assets/account_btn.png"
import interview_btn from"../assets/interview.png"

function Home() {
    const navigate=useNavigate();
    const [newQuestion,setNewQuestion]=useState("")
    const [questions,setQuestions]=useState([])
    const [records,setRecords]=useState([])
    const [currentRecord,setCurrentRecord]=useState("")
    const [recordQuestions,setRecordQuestions]=useState([])
    const [pageType,setPageType]=useState("Questions")
    const [addDoc,setAddDoc]=useState("")
    const [document,setDocument]=useState("")
    const [isLoading,setIsLoading]=useState("")
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [repeatRecords,setRepeatRecords] = useState(false)
    const [expandType,setExpandType] = useState("")
    const [expandIndex,setExpandIndex] = useState(-1)
    const [editRecord,setEditRecord] = useState("")
    const [newJob,setNewJob] = useState("")
    function shuffle(array) {
        let currentIndex = array.length;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }
    function timeFormat(sqlTimeStr) {
        const localDate = new Date(sqlTimeStr);
        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const day = String(localDate.getDate()).padStart(2, '0');
        const hours = String(localDate.getHours()).padStart(2, '0');
        const minutes = String(localDate.getMinutes()).padStart(2, '0');
        const seconds = String(localDate.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    function expireCalc(record){
        if(!record.expire)return null
        let recordedTime = new Date(record.recordedTime)
        let expirationTime = recordedTime.setDate(recordedTime.getDate() + record.expire);
        return Math.ceil((expirationTime - new Date()) / (1000 * 60 * 60 * 24));
    }
    const getQuestions=()=>{
        axios({
            url:process.env.REACT_APP_BACKEND+'questions/get',
            method:'POST',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            }
        }).then((response)=>{
            if(response.data.status==="success")setQuestions(response.data.questions.reverse())
            else if(response.data.status==='token missing' || response.data.status==='session expired' || response.data.status==='invalid token'){
                localStorage.clear()
                alert("Session expired. Please login again")
                window.location.assign(window.location.origin);
            }
        }).catch((error)=>{})
    }
    const getRecords=()=>{
        axios({
            url:process.env.REACT_APP_BACKEND+'records/get',
            method:'POST',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            }
        }).then((response)=>{
            if(response.data.status==="success"){
                setRepeatRecords((response.data.records.filter((record)=>(record.expire===null))).length!==0)
                setRecords(response.data.records.reverse())
            }
            else if(response.data.status==='token missing' || response.data.status==='session expired' || response.data.status==='invalid token'){
                localStorage.clear()
                alert("Session expired. Please login again")
                window.location.assign(window.location.origin);
            }
        }).catch((error)=>{})
    }
    const addQuestion=()=>{
        if(newQuestion==="")return
        axios({
            url:process.env.REACT_APP_BACKEND+'questions/add',
            method:'POST',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            },
            data:JSON.stringify({
                question:newQuestion
            })
        }).then((response)=>{
            if(response.data.status==="success"){
                setNewQuestion("")
                setQuestions([{question:newQuestion, questionType:0}, ...questions])
            }
            else if(response.data.status==='token missing' || response.data.status==='session expired' || response.data.status==='invalid token'){
                localStorage.clear()
                alert("Session expired. Please login again")
                window.location.assign(window.location.origin);
            }
            else alert("Failed to add question")
        }).catch((error)=>{
            alert("Failed to add question")
        })
    }
    const deleteQuestion=(question)=>{
        axios({
            url:process.env.REACT_APP_BACKEND+'questions/delete',
            method:'POST',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            },
            data:JSON.stringify({
                question:question
            })
        }).then((response)=>{
            if(response.data.status==="success"){
                let filteredQuestion=[...questions]
                filteredQuestion.splice(filteredQuestion.indexOf(question),1)
                setQuestions(filteredQuestion)
            }
            else if(response.data.status==='token missing' || response.data.status==='session expired' || response.data.status==='invalid token'){
                localStorage.clear()
                alert("Session expired. Please login again")
                window.location.assign(window.location.origin);
            }
            else alert("Failed to delete question")
        }).catch((error)=>{
            alert("Failed to delete question")
        })
    }
    const deleteRecord=(recordedTime)=>{
        if(!window.confirm("You want to delete record for "+recordedTime+" ?"))return
        axios({
            url:process.env.REACT_APP_BACKEND+'records/delete',
            method:'POST',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            },
            data:JSON.stringify({
                recordedTime:recordedTime
            })
        }).then((response)=>{
            if(response.data.status==="success"){
                setRecords(records.filter((record)=>timeFormat(record.recordedTime)!==recordedTime))
            }
            else if(response.data.status==='token missing' || response.data.status==='session expired' || response.data.status==='invalid token'){
                localStorage.clear()
                alert("Session expired. Please login again")
                window.location.assign(window.location.origin);
            }
            else alert("Failed to delete record")
        }).catch((error)=>{
            alert("Failed to delete record")
        })
    }
    const renameRecord=(oldJob)=>{
        if(oldJob===newJob)return
        axios({
            url:process.env.REACT_APP_BACKEND+'records/rename',
            method:'POST',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            },
            data:JSON.stringify({
                recordedTime:timeFormat(editRecord),
                job:newJob
            })
        }).then((response)=>{
            if(response.data.status==="success"){
                getRecords()
            }
            else if(response.data.status==='token missing' || response.data.status==='session expired' || response.data.status==='invalid token'){
                localStorage.clear()
                alert("Session expired. Please login again")
                window.location.assign(window.location.origin);
            }
            else alert("Failed to rename record")
        }).catch((error)=>{
            alert("Failed to rename record")
        })
    }
    const addDocument=()=>{
        if(document==="" || addDoc==="")return
        setIsLoading("questions")
        axios({
            url:process.env.REACT_APP_BACKEND+'questions/addDocument',
            method:'POST',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            },
            data:JSON.stringify({
                document:{
                    content:document,
                    type:addDoc
                }
            })
        }).then((response)=>{
            if(response.data.status==="success"){
                setDocument("")
                setAddDoc("")
                getQuestions()
            }
            else if(response.data.status==='token missing' || response.data.status==='session expired' || response.data.status==='invalid token'){
                localStorage.clear()
                alert("Session expired. Please login again")
                window.location.assign(window.location.origin);
            }
            else alert("Failed to upload your "+addDoc+". Make sure your entered information is relevant")
            setIsLoading("")
        }).catch((error)=>{
            alert("Failed to upload your "+addDoc+". Make sure your entered information is relevant")
            setIsLoading("")
        })
    }
    const getRecordQuestions=(recordedTime)=>{
        setCurrentRecord(recordedTime)
        axios({
            url:process.env.REACT_APP_BACKEND+'records/questions',
            method:'POST',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            },
            data:JSON.stringify({
                recordedTime:recordedTime
            })
        }).then((response)=>{
            if(response.data.status==="success")setRecordQuestions(response.data.questions.reverse())
            else if(response.data.status==='token missing' || response.data.status==='session expired' || response.data.status==='invalid token'){
                localStorage.clear()
                alert("Session expired. Please login again")
                window.location.assign(window.location.origin);
            }
        }).catch((error)=>{})
    }
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        getQuestions()
        getRecords()
    }, []);
    useEffect(() => {
        getQuestions()
        getRecords()
        
        const interval = setInterval(() => {
            if(repeatRecords)getRecords()
        }, 30000); // 30 seconds in milliseconds
      
        return () => {
            clearInterval(interval);
        };
    }, [repeatRecords]);
    const styles={
        screen:{
            height:'100svh',
            display:'flex',
            flexDirection:'column',
            backgroundColor:'white',
            fontSize:'0.17in',
            position:'relative',
            userSelect:'none'
        },
        selectBox:{
            flexGrow:1,
            borderRadius:'0.075in',
            borderColor:'grey',
            border:'solid thin grey',
            height:'0.4in',
            color:'rgb(87,87,87)',
            textAlign:'center'
        },
        page:{
            display:'flex',
            flexDirection:'row',
            position: 'absolute',
            top: windowWidth>=700?0:'0.6in',
            bottom: 0,
        },
        half:{
            width:windowWidth>=700?'50vw':'100vw',
            display:'flex',
            flexDirection:'column'
        },
        header:{
            height:'fit-content',
            display:'flex',
            flexDirection:'row',
            padding:'0.1in'
        },
        inputBox:{
            flexGrow:1,
            marginRight:'0.1in',
            borderRadius:'0.075in',
            borderColor:'grey',
            border:'solid thin grey',
            paddingRight:'0.1in',
            paddingLeft:'0.1in',
            outline:'none'
        },
        jobPostInputBox:{
            padding:'0.1in',
            paddingTop:'0.1in',
            paddingBottom:'0.1in',
            resize:'none',
            flexGrow:1,
            border:'none',
            outline:'none'
        },
        smallBtn:{
            color:'white',
            paddingLeft:'0.15in',
            paddingRight:'0.15in',
            borderRadius:'0.075in',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center'
        },
        recordTitle:{
            flexGrow:1,
            color:'white',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center'
        },
        list:{
            fontSize:'0.16in',
            overflowY:'auto',
            flexGrow:1
        },
        footer:{
            height:'fit-content',
            display:'flex',
            flexDirection:'column',
            paddingTop:'0.1in'
        },
        footerRow:{
            display:'flex',
            flexDirection:'row',
            padding:'0.1in',
            paddingTop:0,
            height:'0.4in'
        },
        bigBtn:{
            color:'white',
            paddingLeft:'0.15in',
            paddingRight:'0.15in',
            borderRadius:'0.075in',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            flexGrow:1
        },
        listItem:{
            backgroundColor:'white',
            display:'flex',
            flexDirection:'row',
            margin:'0.1in',
            borderRadius:'0.075in'
        },
        questionContent:{
            flexGrow:1,
            textAlign:'left',
            padding:'0.1in'
        },
        deleteBtn:{
            color:'white',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            padding:'0.1in',
            fontSize:'0.2in',
            borderTopRightRadius:'0.075in',
            borderBottomRightRadius:'0.075in'
        },
        loading_screen:{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            flexGrow:1
        },
        loading_logo:{
            height:'1.5in',
            width:'1.5in',
            color:'rgb(102,153,255)',
            display:'flex',
            alignItems:'center',
            flexDirection:'column',
            justifyContent:'center',
            position:'relative'
        },
        looper:{
            height:'1.5in',
            width:'1.5in',
            position:'absolute',
            left:0,
            top:0
        },
        recordQuestion:{
            backgroundColor:'white',
            display:'flex',
            flexDirection:'column',
            margin:'0.1in',
            borderRadius:'0.075in'
        }
    }
    return (
      <div style={styles.screen}>
        {windowWidth<700 && <div style={{...styles.header, backgroundColor:'rgb(211,211,211)'}} onClick={()=>{
            setNewJob("")
            setEditRecord("")
        }}>
            <select disabled={addDoc} style={styles.selectBox} value={pageType} onChange={(event)=>{setPageType(event.target.value)}}>
                <option>Questions</option>
                <option>Records</option>
            </select>
        </div>}
        <div style={styles.page}>
            {(windowWidth>=700 || pageType==="Questions") && <div style={styles.half}>
                {!addDoc && <div style={styles.header}>
                    {windowWidth>=700 && <img style={{height:'0.4in',marginRight:'0.1in'}} src={logo}/>}
                    {windowWidth<700 && <img style={{height:'0.4in',marginRight:'0.1in'}} src={account_blue_btn}  onClick={()=>navigate("../account")}/>}
                    <input style={styles.inputBox} placeholder="Search your questions"/>
                    <img style={{borderRadius:'0.075in', height:'0.4in'}} src={interview_btn}  onClick={()=>{
                        if(localStorage.getItem("interviews")==0){
                            alert("You ran out of interviews")
                            return
                        }
                        let shuffled=[...questions]
                        shuffle(shuffled)
                        navigate("../countdown",{
                            state:{
                                questions:shuffled.slice(0,10).map((item)=>item.question)
                            }
                        })
                    }}/>
                </div>}
                {!addDoc && <div style={{...styles.list,backgroundColor:'rgb(211,211,211)'}}>
                    {questions.map((item,index)=>{
                        let textTypes=["","Resume","Job Post"]
                        return (<div style={styles.listItem} key={index}>
                            <div style={styles.questionContent}>{item.question}<div style={{fontWeight:'bold',color:(textTypes[item.questionType]==='Resume'?'rgb(102,153,255)':'rgb(255,124,128)')}}>{textTypes[item.questionType]}</div></div>
                            <div style={{...styles.deleteBtn,backgroundColor:'rgb(102,153,255)'}} onClick={()=>{deleteQuestion(item)}}>X</div>
                        </div>)
                    })}
                </div>}
                {!isLoading && addDoc && <textarea  style={styles.jobPostInputBox} placeholder={"Quickly enter or paste your "+addDoc+" here (no styling needed)"} value={document} onChange={(event)=>{setDocument(event.target.value)}}/>}
                {isLoading==='questions' && <div style={styles.loading_screen}>
                    <div style={styles.loading_logo}>
                        <img style={styles.looper} src={loading}/>
                        <img style={{width:'0.4in'}} src={blue_logo}/>
                    </div>
                </div>}
                <div style={{...styles.footer, backgroundColor:addDoc?'rgb(211,211,211)':'white', opacity:isLoading==='questions'?0.5:1}}>
                    {!addDoc && <div style={styles.footerRow}>
                        <input style={styles.inputBox} placeholder="Interview question" value={newQuestion} onChange={(event)=>{setNewQuestion(event.target.value)}} onKeyDown={(event)=>{if(event.key==='Enter')addQuestion()}}/>
                        <div style={{...styles.smallBtn, color:'grey', border:'solid thin grey'}} onClick={addQuestion}>Add </div>
                    </div>}
                    <div style={styles.footerRow}>
                        <div style={{...styles.bigBtn,backgroundColor:'rgb(102,153,255)',marginRight:'0.05in'}} onClick={()=>{
                            if(isLoading==='questions')return
                            if(addDoc){
                                setDocument("")
                                setAddDoc("")
                            }
                            else{ 
                                console.log(localStorage.getItem("documents"))
                                if(localStorage.getItem("documents")==0){
                                    alert("You ran out of document uploads")
                                    return
                                }
                                setAddDoc("resume")
                            }
                        }}>{addDoc?"Cancel":"Upload resume"}</div>
                        <div style={{...styles.bigBtn,backgroundColor:'rgb(255,124,128)',marginLeft:'0.05in'}} onClick={()=>{
                            if(isLoading==='questions')return
                            if(addDoc){
                                addDocument()
                            }
                            else{
                                console.log(localStorage.getItem("documents"))
                                if(localStorage.getItem("documents")==0){
                                    alert("You ran out of document uploads")
                                    return
                                }
                                setAddDoc("job post")
                            }
                        }}>{addDoc?"Upload":"Upload job post"}</div>
                    </div>
                </div>
            </div>}
            {(windowWidth>=700 || pageType==="Records") && <div style={{...styles.half, backgroundColor:'rgb(102,153,255)'}}>
                <div style={{...styles.header, flexDirection:(windowWidth>=700?'row':'row-reverse')}}>
                    {currentRecord && <img style={{height:'0.4in'}} src={cancel_btn} onClick={()=>{
                        setCurrentRecord("")
                        setExpandIndex(-1)
                        setExpandType("")
                    }}/>}
                    {!currentRecord && <div style={{width:'0.4in'}}></div>}
                    <div style={styles.recordTitle}>{currentRecord?currentRecord:"Your record"}</div>
                    <img style={{height:'0.4in'}} src={account_btn} onClick={()=>navigate("../account")}/>
                </div>
                <div style={{...styles.list,backgroundColor:'rgb(150,220,248'}}>
                    {!currentRecord && records.map((item,index)=>{
                        let expire=expireCalc(item)
                        return <div style={{...styles.listItem,opacity:(expire?1:0.7)}} key={index}>
                            <div style={styles.questionContent}>
                                <div style={{color:'rgb(102,153,255)', display:'flex', flexDirection:'row'}}>
                                    {editRecord!==item.recordedTime && <div style={{
                                        color:'rgb(87,87,87)', 
                                        paddingRight:'0.1in', 
                                        fontWeight:'bold',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        flexGrow:1,
                                        width:0
                                    }} onClick={()=>{
                                        if(editRecord===item.recordedTime)return
                                        if(expire){
                                            setNewJob("")
                                            setEditRecord("")
                                            getRecordQuestions(timeFormat(item.recordedTime))
                                        }
                                    }}>{item.job}</div>}
                                    {editRecord===item.recordedTime && <input 
                                        style={{...styles.inputBox, borderRadius:'0.04in'}} 
                                        value={newJob} 
                                        onChange={(event)=>setNewJob(event.target.value)}
                                        onKeyDown={(event)=>{
                                            if(event.key==='Enter'){
                                                renameRecord(item.job)
                                                setNewJob("")
                                                setEditRecord("")
                                            }
                                        }}
                                    />}
                                    {!repeatRecords && <div onClick={()=>{
                                        if(editRecord===item.recordedTime){
                                            renameRecord(item.job)
                                            setNewJob("")
                                            setEditRecord("")
                                        }else{
                                            setNewJob(item.job)
                                            setEditRecord(item.recordedTime)
                                        }
                                    }}>{(editRecord===item.recordedTime)?"Done":"Rename"}</div>}
                                    {editRecord===item.recordedTime && <div style={{paddingLeft:'0.1in', color:'rgb(255,124,128)'}} onClick={()=>{
                                        setNewJob("")
                                        setEditRecord("")
                                    }}>Cancel</div>}
                                </div>
                                <div onClick={()=>{
                                    if(editRecord===item.recordedTime)return
                                    if(expire){
                                        setNewJob("")
                                        setEditRecord("")
                                        getRecordQuestions(timeFormat(item.recordedTime))
                                    }
                                }}>
                                    <div style={{color:'rgb(87,87,87)'}}>{timeFormat(item.recordedTime)}</div>
                                    <div style={{color:'rgb(102,153,255)'}}>{expire?("Expire in "+expire+(expire<=1?" day":" days")):"Reviewing..."}</div>
                                </div>
                            </div>
                            {expire && <div style={{...styles.deleteBtn,backgroundColor:'rgb(255,124,128)', opacity:(editRecord!==item.recordedTime)?1:0.5}} onClick={()=>{
                                if(editRecord!==item.recordedTime)deleteRecord(timeFormat(item.recordedTime))
                            }}>X</div>}
                        </div>
                    })}
                    {currentRecord && recordQuestions.map((item,index)=>(
                        <div style={styles.recordQuestion} key={index}>
                            <div style={{...styles.questionContent, color:'rgb(87,87,87)'}}>
                                {item.question}
                            </div>
                            <div style={{
                                color:'rgb(102,153,255)',
                                display:'flex',
                                flexDirection:'row',
                                paddingLeft:'0.1in',
                                paddingBottom:'0.1in'
                            }}>
                                <div style={{textDecoration:(expandType==="answer" && expandIndex===index)?'underline':'', paddingRight:'0.2in'}} onClick={()=>{
                                    if(expandType==="answer" &&expandIndex===index){
                                        setExpandType("")
                                        setExpandIndex(-1)
                                    }else{
                                        setExpandType("answer");
                                        setExpandIndex(index)
                                    }
                                }}>Answer</div>
                                <div style={{textDecoration:(expandType==="review" && expandIndex===index)?'underline':''}} onClick={()=>{
                                    if(expandType==="review" &&expandIndex===index){
                                        setExpandType("")
                                        setExpandIndex(-1)
                                    }else{
                                        setExpandType("review");
                                        setExpandIndex(index)
                                    }
                                }}>Review</div>
                            </div>
                            {expandType==="answer" && expandIndex===index && <div style={{...styles.questionContent, color:'rgb(87,87,87)'}}>
                                {item.answer}
                            </div>}
                            {expandType==="review" && expandIndex===index && <div style={{...styles.questionContent, color:'rgb(87,87,87)'}}>
                                {item.review}
                            </div>}
                        </div>
                    ))}
                </div>
            </div>}
        </div>
      </div>
    );
}

export default Home;