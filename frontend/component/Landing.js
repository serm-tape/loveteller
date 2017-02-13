import React, {Component} from "react"
import {browserHistory} from "react-router"

class Landing extends Component{
	render(){
		return(
			<div style={{width:'100vw', textAlign:'center', height:'100vh'}}>
				<div style={{margin: '10px'}}>
					<img src="/img/logo.png" alt="logo" style={{maxHeight:'50vh', maxWidth:'90vw'}}/>
				</div>
				<h1> Love Teller </h1>
				<p> Love Teller คือจดหมายรักออนไลน์ เพียงเขียนข้อความเฉพาะเจาะจงถึงคนพิเศษแล้วแชร์ลงบนวอลล์ แล้วลุ้นดูว่าคนพิเศษของคุณ จะเปิดอ่านและตอบจดหมายรักฉบับนี้หรือไม่</p>
				<div style={{backgroundColor:'#DAC891', minHeight:'40vh'}}>
					<button className='btn btn-primary' style={{margin:'10vh auto'}} onClick={this.login.bind(this)}>
						Login with facebook
					</button>
				</div>
			</div>
		)
	}

	login(){
		if(!this.props.fbid){
			this.props.login((response)=>{
				if(response && window.location.pathname == '/')
					browserHistory.push('compose')
			})
		}else{
			browserHistory.push('compose')
		}
	}
}

export default Landing