import React, {Component} from "react"
import {browserHistory} from "react-router"

class Landing extends Component{
	render(){
		return(
			<div style={{width:'100vw', textAlign:'center', height:'100vh'}}>
				<div style={{margin: '10px'}}>
					<img src="img/logo.png" alt="logo" style={{maxHeight:'50vh', maxWidth:'90vw'}}/>
				</div>
				<h1> Love Teller </h1>
				<p> Love teller คือ จดหมายรักออนไลน์ที่ให้คุณแชร์จดหมายที่บรรจุข้อความของคุณไว้
				แล้วแชร์ออกไปเพื่อลุ้นว่า คนที่คุณต้องการ จะมาเปิดอ่านหรือไม่ </p>
				<div style={{backgroundColor:'#DAC891', minHeight:'40vh'}}>
					<button className='btn btn-primary' style={{margin:'10vh auto'}} onClick={this.login.bind(this)}>
						Login with facebook
					</button>
				</div>
			</div>
		)
	}

	login(){
		const redirect = '/' + (this.props.routes[1] && this.props.routes[1].path || 'compose')
		if(!this.props.fbid){
			this.props.login((response)=>{
				console.log(response)
				if(response)
					browserHistory.push(redirect)
			})
		}else{
			browserHistory.push(redirect)
		}
	}
}

export default Landing