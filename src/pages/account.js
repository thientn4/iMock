import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import vertical_logo from "../assets/vertical_logo.png"
import cancel_blue_btn from "../assets/cancel_blue_btn.png"
import tiny_doc from"../assets/tiny_doc.png"
import tiny_interview from"../assets/tiny_interview.png"

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
        },
        tblRow:{
            display:'flex',
            flexDirection:'row',
            width:'100%',
        },
        cell:{
            width:'50%',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            padding:'0.05in'
        }
    }
    return (
      <div style={styles.screen}>
        <div style={styles.container}>
            <img style={{width:'1.4in',paddingBottom:'0.25in'}} src={vertical_logo}/>
            <b>{localStorage.getItem("email")}</b>
            <div style={{
                width:'100%',
                paddingTop:'0.2in'
            }}>
                <div style={{...styles.tblRow,marginBottom:'0.025in'}}>
                    <div style={{...styles.cell, backgroundColor:'rgb(102,153,255)',marginRight:'0.025in', borderTopLeftRadius:'0.075in'}}>
                        <img src={tiny_doc} style={{height:'0.2in'}}/>
                    </div>
                    <div style={{...styles.cell, backgroundColor:'rgb(102,153,255)', borderTopRightRadius:'0.075in'}}>
                        <img src={tiny_interview} style={{height:'0.2in'}}/>
                    </div>
                </div>
                <div style={styles.tblRow}>
                    <div style={{...styles.cell, backgroundColor:'rgb(211,211,211)',marginRight:'0.025in', borderBottomLeftRadius:'0.075in'}}>{100}</div>
                    <div style={{...styles.cell, backgroundColor:'rgb(211,211,211)', borderBottomRightRadius:'0.075in'}}>{100}</div>
                </div>
            </div>
            <div style={{...styles.btn,backgroundColor:'rgb(255,124,128)',marginTop:'0.25in',marginBottom:'0.1in'}} onClick={()=>{
                alert("iMock is still under testing. You can enjoy our free plan for now!")
            }}>buy interviews</div>
            <div style={{...styles.btn,backgroundColor:'rgb(102,153,255)',marginBottom:'0.25in'}} onClick={()=>{
                localStorage.clear()
                navigate("../")
            }}>sign out</div>
            <img style={{width:'0.5in',paddingTop:'0.1in'}} src={cancel_blue_btn}  onClick={()=>navigate("../home")}/>
        </div>
      </div>
    );
}

export default Account;