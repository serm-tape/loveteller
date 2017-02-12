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
			},
			feedFunc: null,
		}
	}

	render(){
		return (
			<div style={{margin:'10px'}}>
				<h1> เขียนข้อความถึงคนพิเศษ </h1>
				<hr/>
				ชื่อ facebook ของเค้าคนนั้น
				<input
					onChange={this.updateFormValue.bind(this)}
					type='text'
					className='form-control'
					name='target'
					placeholder='ชื่อ นามสกุล'
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
					disabled={!(this.state.valid.target && this.state.valid.message && this.state.valid.message2)}
				>
				แชร์ แล้วลุ้นให้เค้ามาอ่าน
				</button>
				<div className="modal fade" id="myModal" role="dialog">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal">&times;</button>
								<h4 className="modal-title">ยืนยัน</h4>
							</div>
							<div className="modal-body">
								<p>{this.state.valid.target} เข้ามาจะเห็นคำว่า {this.state.valid.message}</p><br/>
								<p>คนอื่นจะเห็นคำว่า {this.state.valid.message2}</p><br/>
							</div>
							<div className="modal-footer">
								<button id='ok-btn' type="button" className="btn btn-default" data-dismiss="modal" onClick={this.state.feedFunc}>ตกลง</button>
							</div>
						</div>
					</div>
				</div>
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
			case 'target': return {target: validateName(value)}
			case 'message': return {message: value.trim()}
			case 'message2': return {message2: value.trim()}
		}
	}

	compose(){
		FB.AppEvents.logEvent('SHARE_CLICKED')
		axios.post(
			'/api/links/',
			{
				message1: this.state.valid.message,
				message2: this.state.valid.message2,
				fbName: this.state.valid.target
			},
			{headers:{fbId:this.props.fbid, fbToken:this.props.fbToken, 'Content-Type':'application/json'}}
		).then( response => {
			$('#myModal').modal()
			this.setState({feedFunc:()=>{this.feedToFacebook(response.data.linkId)}})
		}).catch(e => {
			window.alert('error')
		})
	}

	feedToFacebook(linkId){
		FB.ui({
			method: 'feed',
			link: `${window.location.host}/read/${linkId}`,
			picture: `${window.location.host}/img/logo.png`,
			name: 'วาเลนไทน์นี้ เรามีเรื่องจะบอก',
			caption: 'คุณจะใช้คนคนนั้นหรือไม่ คลิก',
			description: 'แอบชอบใคร อยากรู้ว่าเค้าคิดเหมือนกันไหม ให้ Love teller ช่วยบอก',
		},(r)=>{
			if (r&&r.error_message){	
				FB.AppEvents.logEvent('SHARE_ERROR')
			}else{
				FB.AppEvents.logEvent('SHARE_SUCCESS')
				alert(r && r.error_message || 'รอลุ้นได้เลย')
			}
		})
	}
}

function validateName(name){
	const token = name.split('(')
	return token[0].trim()
}

function extractUrl(url){
	const token = url.trim().split(/[\/\?]+/)
	//https, www.facebook.com, {target-name}
	return token[2]
}



export default Composer