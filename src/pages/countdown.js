import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Countdown() {
    const navigate=useNavigate();
    const [second,setSecond]=useState(10)
    const styles={
        screen:{
            width:'100vw',
            height:'100svh',
            backgroundColor:'white',
            display:'flex',
            flexDirection:'column'
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
            backgroundColor:'rgb(255,124,128)'
        },
        clock:{
            height:'1.5in',
            width:'1.5in',
            borderRadius:'1.5in',
            borderStyle:'solid',
            borderWidth:'thick',
            borderColor:'rgb(102,153,255)',
            color:'rgb(102,153,255)',
            fontSize:'0.75in',
            textAlign:'center',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            marginBottom:'0.5in'
        }
    }
    const countdown=async ()=>{
        for(let i=0; i<=11; i++)
            setTimeout(()=>{
                if(second-i>=0)setSecond(second-i)
                if(second-i===-1)navigate("../home")
            },1000*i)
    }
    return (
      <div style={styles.screen}>
        <div style={styles.header}>
            <img style={{height:'0.4in',marginRight:'0.1in'}} src={require("../assets/cancel_btn.png")} onClick={()=>navigate("../home")}/>
            <img style={{height:'0.4in',marginRight:'0.1in'}} src={require("../assets/horizontal_logo_mono.png")}/>
            <div style={{width:'0.4in'}}></div>
        </div>
        <div style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            flexGrow:1
        }}>
            <div style={styles.clock}>{second}</div>
            <div style={styles.btn} onClick={countdown}>start</div>
        </div>
      </div>
    );
}

export default Countdown;