import React, { useState, useEffect } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Interview() {
    const navigate=useNavigate();
    const [speaking, setSpeaking]=useState(false)
    const [audioPlaying, setAudioPlaying]=useState(false)
    const [questions, setQuestions]=useState([])
    const [question, setQuestion]=useState("Tell me about the time when you worked for Power Settlement. Name some challenges you faced and how you handled them.")
    const [iter, setIter]=useState(0)
    const stopSpeak=()=>{
        speechSynthesis.cancel();
        setSpeaking(false)
    }
    const speak=()=>{
        if(speaking){
            stopSpeak()
            return
        }
        speechSynthesis.cancel();
        let voiceChoice=speechSynthesis.getVoices()[2]
        let cur_speech=new SpeechSynthesisUtterance(question);
        cur_speech.volume=1 //0 to 1
        cur_speech.rate=1.3 //0.1 to 10
        cur_speech.pitch=1.2 //0 to 2
        cur_speech.voice=voiceChoice
        cur_speech.lang="en-US"
        cur_speech.addEventListener("end",()=>{setSpeaking(false)})
        cur_speech.addEventListener("start",()=>{setSpeaking(true)})
        speechSynthesis.speak(cur_speech)
    }
    useEffect(() => {
        let audio = document.getElementById("audioPlayer");
        audio.onplay = function() {setAudioPlaying(true)};
        audio.onended = function() {setAudioPlaying(false)};
        audio.onpause = function() {setAudioPlaying(false)};
    })
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
            color:'white',
            padding:'0.05in',
            paddingLeft:'0.4in',
            paddingRight:'0.4in',
            borderRadius:'0.075in',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            fontSize:'0.2in',
            userSelect:'none'
        },
        score:{
            color:'rgb(102,153,255)',
            backgroundColor:'white',
            padding:'0.05in',
            margin:'0.1in',
            paddingLeft:'0.2in',
            paddingRight:'0.2in',
            borderRadius:'0.075in',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            fontSize:'0.2in',
            userSelect:'none',
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
        }
    }
    return (
      <div style={styles.screen}>
        <div style={styles.header}>
            <img style={{height:'0.4in',margin:'0.1in'}} src={require("../assets/cancel_btn.png")} onClick={()=>{stopSpeak();navigate("../home");}}/>
            <img style={{height:'0.4in',margin:'0.1in'}} src={require("../assets/horizontal_logo_mono.png")}/>
            <div style={styles.score}>{iter} / {questions.length}</div>
        </div>
        <div style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            flexGrow:1,
            width:'fit-content'
        }}>
            <div>
                <div style={styles.audio}>
                    {(speaking || audioPlaying) && <img style={{width:'1in'}} src={require("../assets/speaker.gif")}/>}
                    {!speaking && !audioPlaying && <img style={{width:'1in'}} src={require("../assets/speaker.png")}/>}
                </div>
            </div>
            <div style={{
                fontSize:'0.2in',
                borderTop:'solid',
                borderBottom:'solid',
                borderColor:'rgb(255,124,128)',
                maxWidth:'5in',
                padding:'0.2in'
            }}>
                {question}
            </div>
            <div style={{
                display:'flex',
                flexDirection:'row',
                padding:'0.2in',
                justifyContent:'space-between',
                width:'100%'
            }}>
                <img style={{height:'0.4in', paddingLeft:'0.2in'}} src={require("../assets/prev_btn.png")} onClick={()=>{stopSpeak()}}/>
                <div style={{...styles.btn, backgroundColor:'rgb(255,124,128)'}} onClick={speak}>{speaking?"Cancel":"Replay"}</div>
                <div style={{...styles.btn, backgroundColor:'rgb(102,153,255)',opacity:(speaking?0.5:1)}}>Answer</div>
                <img style={{height:'0.4in', paddingRight:'0.2in'}} src={require("../assets/next_btn.png")}  onClick={()=>{stopSpeak()}}/>
            </div>
            <audio controls autoplay style={{width:'100%',opacity:(speaking?0.5:1),pointerEvents:(speaking?'none':'')}} id="audioPlayer" disabled={speaking}>
                <source src={require("../assets/sample_audio.mp3")} type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>
        </div>
      </div>
    );
}

export default Interview;