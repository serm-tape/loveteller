import React, {Component} from "react"
import {browserHistory} from "react-router"
import axios from "axios"

import '../style/anim.scss'

//fb.com/read/{from-id}
class Reader extends Component{

    constructor(){
        super()
        this.state = {
            message: null,
            message2: null,
            name: null,
            fromId: null
        }
    }
    
    componentDidUpdate(nextProps){
        if(nextProps.fbMounted != this.props.fbMounted){
            axios.get(
                `/api/links/${this.props.params.linkId}/letter`,
                {headers:{fbId:this.props.fbid, fbToken:this.props.fbToken, 'Content-Type':'application/json'}},   
            ).then( ( response ) => {
                FB.api(
                    `/${response.data.fbId}`,
                    (resp) => {
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
                <div style={{backgroundColor: '#DAC891'}}>
                    <div style={{margin:'10vh', padding:'10vh'}}>
                        <h1 style={{animation:'fadein 2s forwards', opacity:0}}> {title} </h1>
                        <h1 style={{animation:'fadein 2s forwards', opacity:0, animationDelay:'3s'}}> {this.state.message} </h1>
                        <h1 style={{animation:'fadein 2s forwards', opacity:0, animationDelay:'3s'}}> {this.state.message2} </h1>
                    </div>
                </div>
                <button 
                    className="btn btn-primary"
                    onClick={ () => {
                        FB.ui({method:'send', to:this.state.fromId, link:window.location.href})
                    }}
                    style={{animation: 'fadein 2s forwards', opacity:0, animationDelay:'6s'}}
                >
                    ตอบกลับว่าคุณก็คิดเช่นเดียวกัน
                </button>
                <button
                    style={{animation: 'fadein 2s forwards', opacity:0, animationDelay:'6s'}}
                    className="btn"
                    onClick={()=>{browserHistory.push('/compose')}}
                >
                    สร้างจดหมายของคุณเองบ้าง
                </button>
            </div>
        )
    }
}

export default Reader