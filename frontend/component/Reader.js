import React, {Component} from "react"
import {browserHistory} from "react-router"
import axios from "axios"

//fb.com/read/{from-id}
class Reader extends Component{

    constructor(){
        super()
        this.state = {
            from: '',
            message: ''
        }
    }

    componentWillMount(){
        FB.api(this.props.params.from, resp => {this.setState({from:resp.data.name})})
        axios.get(
            `/api/v1/letter/${this.props.params.from}/`,
            {headers:{fbid:this.props.fbid, fbToken:this.props.accessToken}},
            ( response ) => {
                this.setState({message: response.message})
            }
        )
    }

    render(){
         if (!this.state.from && !this.state.message){
            return (<h1> Openning ... </h1>)
        }else{
            return (
                <div>
                    {this.from} Want to tell you that, <br/>
                    {this.state.message}
                    <button className="btn btn-primary" onClick={FB.ui.send()}> Tell him/her that you think the same </button>
                    <button className="btn" onClick={()=>{browserHistory.push('/compose')}}> Make one yourself </button>
                </div>
            )
        }
    }
}