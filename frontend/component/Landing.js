import React, {Component} from "react"
import {browserHistory} from "react-router"

class Landing extends Component{
	render(){
		return(
			<div>
				<h1> Love Teller </h1>
				<img src="img/logo.png" alt="logo" />
				<p> Love teller คือ จดหมายรักออนไลน์ที่ให้คุณแชร์จดหมายที่บรรจุข้อความของคุณไว้
				แล้วแชร์ออกไปเพื่อลุ้นว่า คนที่คุณต้องการ จะมาเปิดอ่านหรือไม่ </p>
				<button className='btn btn-primary' onClick={this.login.bind(this)}>
					Login with facebook
				</button>
			</div>
		)
	}

	login(){
		const redirect = '/' + (this.location && this.location.query && this.location.query.mode || 'compose')
		if(!this.props.fbid){
			this.props.login(browserHistory.push, redirect)
		}else{
			browserHistory.push(redirect)
		}
	}
}

export default Landing