import React, {Component} from "react"
import {browserHistory} from "react-router"
import axios from "axios"

//fb.com/read/{from-id}
class Reader extends Component{

    constructor(){
        super()
        this.state = {
            from: null,
            message: null,
            name: 'A facebook user'
        }
    }

    componentDidUpdate(nextProps){
        if(nextProps.fbMounted != this.props.fbMounted){
            FB.api(
                `/${this.props.fbid}`,
                (resp)=>{
                    this.setState({name:resp.name})
                    axios.get(
                        `/api/v1/letter/${this.props.params.from}/`,
                        {headers:{fbid:this.props.fbid, fbToken:this.props.accessToken}},
                        ( response ) => {
                            this.setState({message: response.message})
                        }
                    )
                }
            )
        }
    }

    render(){
        return (
            <div>
                {this.state.name || "มีบางคน" } อยากจะบอกคุณว่า <br/>
                {this.state.message || (<div><i className="fa fa-cog fa-spin" />กำลังเปิดข้อความ</div>)}
                <button 
                    className="btn btn-primary"
                    onClick={ () => {
                        FB.ui({method:'send', to:this.props.fbid, link:'www.facebook.com'})
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