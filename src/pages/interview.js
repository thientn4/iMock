import React, { useState, useEffect } from "react";
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import cancel_btn from"../assets/cancel_btn.png"
import horizontal_logo_mono from"../assets/horizontal_logo_mono.png"
import speaker from"../assets/speaker.png"
import play from"../assets/play.png"
import microphone from"../assets/microphone.gif"
import prev_btn from"../assets/prev_btn.png"
import next_btn from"../assets/next_btn.png"
import submit_btn from"../assets/submit_btn.png"

function Interview() {
    const navigate=useNavigate();
    /////////////////// TEXT TO SPEECH SETUP ////////////////////
    let cur_speech=new SpeechSynthesisUtterance();
    cur_speech.volume=1 //0 to 1
    cur_speech.rate=1 //0.1 to 10
    cur_speech.pitch=1.2 //0 to 2
    cur_speech.lang="en-US"
    cur_speech.addEventListener("end",()=>{setSpeaking(false)})
    cur_speech.addEventListener("start",()=>{setSpeaking(true)})
    /////////////////// SPEECH TO TEXT SETUP ////////////////////
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable
    } = useSpeechRecognition();
    /////////////////////////////////////////////////////////////



    const [speaking, setSpeaking]=useState(false)
    const params=useLocation();
    const questions=params.state.questions
    const [iter, setIter]=useState(0)
    const [question, setQuestion]=useState(questions[iter])
    const [answers, setAnswers]=useState(new Array(questions.length).fill(null))
    function getTimestamp() {
        const localDate = new Date();
        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const day = String(localDate.getDate()).padStart(2, '0');
        const hours = String(localDate.getHours()).padStart(2, '0');
        const minutes = String(localDate.getMinutes()).padStart(2, '0');
        const seconds = String(localDate.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    const speak=(content)=>{
        if(listening)return
        speechSynthesis.cancel();
        cur_speech.text=content
        speechSynthesis.speak(cur_speech)
    }
    const addRecord=()=>{
        if(answers.filter((answer)=>answer!==null).length===0){
            if(window.confirm("You have no answers to submit for review. Do you want to exit instead"))navigate('../home')
            return
        }
        axios({
            url:process.env.REACT_APP_BACKEND+'records/add',
            method:'POST',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
                'token':localStorage.getItem('token')
            },
            data:JSON.stringify({
                questions:questions,
                answers:answers,
                resume:localStorage.getItem('resume'),
                jobpost:localStorage.getItem('jobpost'),
                timeStamp:getTimestamp(),
                job:params.state.job
            })
        }).then((response)=>{
            if(response.data.status==="success"){
                localStorage.setItem("interviews",parseInt(localStorage.getItem("interviews"))-1)
                navigate('../home')
            }
            else if(response.data.status==='token missing' || response.data.status==='session expired' || response.data.status==='invalid token'){
                localStorage.clear()
                alert("Session expired. Please login again")
                window.location.assign(window.location.origin);
            }
            else alert("Failed to upload your interview")
        }).catch((error)=>{
            alert("Failed to upload your interview")
        })
    }
    useEffect(() => {
        speak(question)
    },[question])
    const styles={
        screen:{
            width:'100vw',
            height:'100svh',
            backgroundColor:'white',
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
        },
        header:{
            height:'fit-content',
            display:'flex',
            flexDirection:'row',
            backgroundColor:'rgb(102,153,255)',
            justifyContent:'space-between',
            width:'100%'
        },
        btn:{
            margin:'0.2in',
            borderRadius:'0.075in',
            color:'white',
            backgroundColor:'rgb(102,153,255)',
            paddingTop:'0.05in',
            paddingBottom:'0.05in',
            marginRight:'0.2in',
            marginLeft:'0.2in',
            borderRadius:'0.075in',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            fontSize:'0.2in',
            userSelect:'none',
            opacity:speaking?0.5:1,
            width:'100%',
            opacity:(speaking)?0.25:1
        },
        score:{
            borderRadius:'0.075in',
            borderColor:'rgb(102,153,255)',
            border:'solid',
            color:'rgb(102,153,255)',
            backgroundColor:'white',
            padding:'0.05in',
            paddingLeft:'0.4in',
            paddingRight:'0.4in',
            marginRight:'0.2in',
            marginLeft:'0.2in',
            borderRadius:'0.075in',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            fontSize:'0.2in',
            userSelect:'none'
        },
        audio:{
            height:'2in',
            width:'2in',
            borderRadius:'1.5in',
            borderStyle:'solid',
            borderWidth:'thick',
            borderColor:'rgb(255,124,128)',
            color:'rgb(102,153,255)',
            fontSize:'0.75in',
            alignItems:'center',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            marginBottom:'0.5in',
            position:'relative'
        },
        nav:{
            borderRadius:'100%',
            border:'solid',
            borderColor:'rgb(102,153,255)',
            height:'0.4in'
        },
        transcript:{
            //height:'0.5in', 
            width:'100%', 
            whiteSpace:'nowrap', 
            overflow:'hidden',
            overflowX:'auto',
            display:'flex',
            flexDirection:'row-reverse',

            border:'solid medium'
        }
    }
    return (
      <div style={styles.screen}>
        <div style={styles.header}>
            <img style={{height:'0.4in',margin:'0.1in'}} src={cancel_btn} onClick={()=>{speechSynthesis.cancel();navigate("../home");}}/>
            <img style={{height:'0.4in',margin:'0.1in'}} src={horizontal_logo_mono}/>
            <div style={{width:'0.4in'}}></div>
        </div>
        <div style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            flexGrow:1,
            width:'3in'
        }}>
            <div style={styles.audio}>
                <img style={{width:'1in', display:((speaking && !listening)?'':'none')}} src={speaker}/>
                <img style={{width:'1in', display:((speaking || listening)?'none':'')}} src={play} onClick={()=>{
                    speak(question)
                }}/>
                <img style={{width:'1in', display:(listening?'':'none')}} src={microphone}/>
            </div>
            <div style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'center',
                width:'100%',
                opacity:((listening)?0.25:1)
            }}>
                <img style={{...styles.nav, opacity:((iter-1<0 && !listening)?0.25:1)}} src={prev_btn} onClick={()=>{
                    if(iter-1<0 || listening)return
                    resetTranscript()
                    setQuestion(questions[iter-1])
                    setIter(iter-1)
                }}/>
                <div style={styles.score}>{iter+1} / {questions.length}</div>
                <img style={{...styles.nav}} src={iter+1>=questions.length?submit_btn:next_btn}  onClick={()=>{
                    if(listening)return
                    if(iter+1>=questions.length){
                        setSpeaking(false)
                        speechSynthesis.cancel()
                        if(window.confirm("You want to end and submit for review?")){
                            addRecord()
                        }
                        return
                    }
                    resetTranscript()
                    setQuestion(questions[iter+1])
                    setIter(iter+1)
                }}/>
            </div>
            <div style={styles.btn} onClick={()=>{
                if(speaking)return
                if(listening){
                    SpeechRecognition.stopListening();
                    answers[iter]=transcript
                }
                else{
                    if (!browserSupportsSpeechRecognition ) {
                        alert("This browser does not support our platform")
                        return
                    }
                    if (!isMicrophoneAvailable) {
                        alert("Please enable iMock to use microphone")
                        return
                    }
                    if(transcript){
                        if(!window.confirm("Are you sure you want to delete and answer again?"))return
                    }
                    resetTranscript()
                    SpeechRecognition.startListening({ continuous: true });
                }
            }}>{listening?"Done":((transcript || answers[iter])?"Answer again":"Answer")}</div>
            <div style={{...styles.transcript, borderColor:(transcript || (answers[iter] && !listening))?'rgb(255,124,128)':'white'}} id="transcript_box">
                <div style={{padding:'0.1in'}}>{(answers[iter] && !listening)?answers[iter]:transcript}</div>
            </div>
        </div>
      </div>
    );
}

export default Interview;