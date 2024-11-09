import React, { useState } from "react";
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import cancel_btn from"../assets/cancel_btn.png"
import horizontal_logo_mono from"../assets/horizontal_logo_mono.png"
import loading from"../assets/loading.gif"

function Countdown() {
    const navigate=useNavigate();
    const params=useLocation();
    const questions=params.state.questions
    const [second,setSecond]=useState(10)
    const [clicked, setClicked]=useState(false)
    const [job, setJob]=useState("")
    const styles={
        screen:{
            width:'100vw',
            height:'100svh',
            backgroundColor:'white',
            display:'flex',
            flexDirection:'column',
            userSelect:'none'
        },
        header:{
            height:'fit-content',
            display:'flex',
            flexDirection:'row',
            padding:'0.1in',
            backgroundColor:'rgb(102,153,255)',
            justifyContent:'space-between'
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
            userSelect:'none',
            backgroundColor:'rgb(255,124,128)',
            marginTop:'0.5in',
            opacity: clicked?'0.5':'1'
        },
        clock:{
            height:'2in',
            width:'2in',
            borderRadius:'1.5in',
            borderStyle:'solid',
            borderWidth:'thick',
            //borderColor:'rgb(255,124,128)',
            color:'rgb(102,153,255)',
            fontSize:'0.75in',
            textAlign:'center',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            marginBottom:'0.5in',
            position:'relative'
        },
        looper:{
            height:'1.5in',
            width:'1.5in',
            position:'absolute',
            left:'0.25in',
            top:'0.25in'
        },
        inputBox:{
            marginRight:'0.1in',
            borderRadius:'0.075in',
            borderColor:'grey',
            border:'solid thin grey',
            paddingLeft:'0.1in',
            paddingRight:'0.1in',
            padding:'0.1in',
            outline:'none'
        }
    }
    const countdown=async ()=>{
        if(clicked)return
        if(job.trim()===""){
            alert("Please give this interview a name")
            return
        }
        setClicked(true)
        for(let i=0; i<=11; i++)
            setTimeout(()=>{
                if(second-i>=0)setSecond(second-i)
                if(second-i===-1)navigate("../interview",{
                    state:{
                        questions:questions,
                        job:job.trim()
                    }
                })
            },1000*i)
    }
    return (
      <div style={styles.screen}>
        <div style={styles.header}>
            <img style={{height:'0.4in',marginRight:'0.1in', opacity:(clicked?0.5:1)}} src={cancel_btn} onClick={()=>{if(!clicked)navigate("../home")}}/>
            <img style={{height:'0.4in',marginRight:'0.1in'}} src={horizontal_logo_mono}/>
            <div style={{width:'0.4in'}}></div>
        </div>
        <div style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            flexGrow:1
        }}>
            <div style={styles.clock}>
                {clicked && <img style={styles.looper} src={loading}/>}
                <div>{second}</div>
            </div>
            <input disabled={clicked} style={styles.inputBox} placeholder="Give this interview a name" value={job} onChange={(event)=>{setJob(event.target.value)}}/>
            <div style={styles.btn} onClick={countdown}>start</div>
        </div>
      </div>
    );
}

export default Countdown;