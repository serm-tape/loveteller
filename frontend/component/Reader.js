import React, {Component} from "react"
import {browserHistory} from "react-router"
import axios from "axios"

import '../style/anim.scss'

//fb.com/read/{from-id}
class Reader extends Component{

    constructor(){
        super()
        this.state = {
            message: 'test',
            message2: null,
            name: 'eiei',
            fromId: null
        }
    }
    
    componentDidMount(){
        if(this.props.fbMounted && this.props.fbid){
            this.getLetterData()
        }
    }

    componentDidUpdate(nextProps,nextState){
        if(nextProps.fbMounted != this.props.fbMounted){
            this.getLetterData()
        }

        //$('#who').delay(200).animate({opacity:1}, 1000)
        //$('#message').delay(1000).animate({opacity:1}, 1000)
        //$('#message2').delay(1000).animate({opacity:1}, 1000)
        //$('#response-btn').delay(3000).animate({opacity:1}, 1000)
        //$('#create-btn').delay(3000).animate({opacity:1}, 1000)
    }

    render(){
        let title = ''
        if (!this.state.name){
            return (<div><i className="fa fa-cog fa-spin" /> กำลังเปิดข้อความ </div>)
        }else if(this.state.message && this.state.message2){
            title = 'นี่คือข้อความที่คุณตั้งไว้'
        }else{
            title = `${this.state.name} อยากจะบอกคุณว่า`
        }
        return (
            <div style={{margin:'10px 0px', textAlign:'center'}}>
                <h1> อ่านข้อความ </h1>
                <hr/>
                <div style={{backgroundColor: '#DAC891'}}>
                    <div style={{margin:'10vh', padding:'10vh'}}>
                        <h1 style={{animation:'2s ease 0s fadein'}}> {title} </h1>
                        <h1 style={{animation:'4s ease 0s fadein2'}}> {this.state.message} </h1>
                        <h1 style={{animation:'4s ease 0s fadein2'}}> {this.state.message2} </h1>
                    </div>
                </div>
                <button 
                    className="btn btn-primary"
                    onClick={ () => {
                        FB.ui({method:'send', to:this.state.fromId, link:window.location.href})
                    }}
                    style={{animation: '6s ease 0s fadein3'}}
                >
                    ตอบกลับว่าคุณก็คิดเช่นเดียวกัน
                </button>
                <button
                    style={{animation: '6s ease 0s fadein3'}}
                    className="btn"
                    onClick={()=>{browserHistory.push('/compose')}}
                >
                    สร้างจดหมายของคุณเองบ้าง
                </button>
            </div>
        )
    }

    getLetterData(){
        FB.AppEvents.logEvent('LETTER_READ')
        axios.get(
            `/api/links/${this.props.params.linkId}/letter`,
            {headers:{fbId:this.props.fbid, fbToken:this.props.fbToken, 'Content-Type':'application/json'}},   
        ).then( ( response ) => {
            FB.api(
                `/${response.data.fbId}`,
                (resp) => {
                    console.log(resp)
                    this.setState({
                        name:resp.name,
                        fromId: response.data.fbId,
                        message: response.data.message1,
                        message2: response.data.message2,
                    })
                })
            }
        )
    }
}

export default Reader