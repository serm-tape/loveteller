import React, {Component} from "react"
import {Link} from "react-router"

import axios from "axios"

import FriendCard from "./FriendCard"

class Composer extends Component {


	constructor(){
		super()
		this.state = {
			valid:{
				target: false,
				message: false,
			}
		}
	}

	render(){
		return (
			<div>
				url facebook ของคนนั้น
				<input
					onChange={this.updateFormValue.bind(this)}
					type='text'
					className='form-control'
					name='target'
					placeholder='https://www.facebook.com/that.girl'
				/><br/>
				ข้อความของคุณ
				<input
					onChange={this.updateFormValue.bind(this)}
					type='text'
					className='form-control'
					name='message'
					placeholder='อยากเป็นแฟนจังเลย'
				/><br/>
				<button
					className='btn btn-primary'
					onClick={this.compose.bind(this)}
					disabled={!(this.state.valid.target || this.state.valid.message)}
				>
				แชร์ แล้วลุ้นให้เค้ามาอ่าน
				</button>
			</div>
		)
	}

	updateFormValue(e){
		const result = this.validate(e.target.name, e.target.value)
		let cState = this.state.valid
		const state = {...cState, ...result}
		console.log(state)
		this.setState({valid:state})
	}

	validate(key, value){
		switch(key){
			case 'target': return {target: validateUrl(value)}
			case 'message': return {message: value.trim()}
		}
	}

	compose(){
		axios.post(
			'/api/v1/compose/',
			{
				writer: this.props.fbid,
				message: this.state.valid.message,
				target: this.state.valid.target
			},
			{headers:{fbid:this.props.fbid, fbToken:this.props.accessToken}}
		).then( response => {
			console.log(response)
		})
	}
}

function validateUrl(url){
	const token = url.trim().split(/[\/\?]+/)
	return token.length >= 3 && token[0]=='https:' && token[1]=='www.facebook.com' && token[2]
}

function extractUrl(url){
	const token = url.trim().split(/[\/\?]+/)
	//https, www.facebook.com, {target-name}
	return token[2]
}



export default Composer