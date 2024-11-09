import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import vertical_logo from "../assets/vertical_logo.png"
import cancel_blue_btn from "../assets/cancel_blue_btn.png"

function Account() {
    const navigate=useNavigate();
    useEffect(() => {
      //if(localStorage.getItem('email'))navigate("home")
    }, []);
    const styles={
        screen:{
            width:'100vw',
            height:'100svh',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'white',
            userSelect:'none',
        },
        container:{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center'
        },
        btn:{
            color:'white',
            padding:'0.03in',
            borderRadius:'0.075in',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            fontSize:'0.2in',
            width:'100%'
        }
    }
    return (
      <div style={styles.screen}>
        <div style={styles.container}>
            <img style={{width:'1.4in',paddingBottom:'0.25in'}} src={vertical_logo}/>
            <b>{localStorage.getItem("email")}</b>
            <div style={{...styles.btn,backgroundColor:'rgb(102,153,255)',marginTop:'0.4in',marginBottom:'0.1in'}} onClick={()=>{
                localStorage.clear()
                navigate("../")
            }}>sign out</div>
            <div style={{...styles.btn,backgroundColor:'rgb(255,124,128)',marginBottom:'0.25in'}} onClick={()=>{alert("iMock is still under testing. You can enjoy our free plan for now!")}}>buy interviews</div>
            <img style={{width:'0.5in',paddingTop:'0.45in'}} src={cancel_blue_btn}  onClick={()=>navigate("../home")}/>
        </div>
      </div>
    );
}

export default Account;