import React, {Component} from "react"
import {browserHistory} from "react-router"
import axios from "axios"

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
            <div>
                {title} <br/>
                {this.state.message} <br/>
                {this.state.message2} <br/>
                <button 
                    className="btn btn-primary"
                    onClick={ () => {
                        FB.ui({method:'send', to:this.state.fromId, link:window.location.href})
                    }}
                >
                    ตอบกลับว่าคุณก็คิดเช่นเดียวกัน
                </button>
                <button className="btn" onClick={()=>{browserHistory.push('/compose')}}> สร้างจดหมายของคุณเองบ้าง </button>
            </div>
        )
    }
}

export default Reader