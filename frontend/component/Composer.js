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
				message2: false,
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
					placeholder='https://www.facebook.com/that.girl.that.guy'
				/><br/>
				ข้อความที่คุณต้องการให้เค้าเห็น
				<input
					onChange={this.updateFormValue.bind(this)}
					type='text'
					className='form-control'
					name='message'
					placeholder='จีบนานแล้วนะ'
				/><br/>
				แต่ถ้าเป็นคนอื่นมาเปิด อยากบอกคนเหล่านั้นว่าอะไร
				<input
					onChange={this.updateFormValue.bind(this)}
					type='text'
					className='form-control'
					name='message2'
					placeholder='อย่างแกน่าจะได้ขึ้นคาน 555'
				/><br/>
				<button
					className='btn btn-primary'
					onClick={this.compose.bind(this)}
					disabled={!(this.state.valid.target || this.state.valid.message || this.state.valid.message2)}
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
			case 'message2': return {message2: value.trim()}
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
			FB.feed({

			})
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