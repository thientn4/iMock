import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Interview() {
    const navigate=useNavigate();
    const [second,setSecond]=useState(10)
    const [questions, setQuestions]=useState([])
    const [question, setQuestion]=useState("Tell me about the time when you worked for Power Settlement. Name some challenges you faced and how you handled them.")
    const [iter, setIter]=useState(0)
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
        }
    }
    return (
      <div style={styles.screen}>
        <div style={styles.header}>
            <img style={{height:'0.4in',margin:'0.1in'}} src={require("../assets/cancel_btn.png")} onClick={()=>navigate("../home")}/>
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
                <img style={{height:'0.4in', paddingLeft:'0.2in'}} src={require("../assets/prev_btn.png")}/>
                <div style={{...styles.btn, backgroundColor:'rgb(255,124,128)'}}>Replay</div>
                <div style={{...styles.btn, backgroundColor:'rgb(102,153,255)'}}>Answer</div>
                <img style={{height:'0.4in', paddingRight:'0.2in'}} src={require("../assets/next_btn.png")}/>
            </div>
            <div>
                
            </div>
        </div>
      </div>
    );
}

export default Interview;