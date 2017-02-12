import React, { Component } from 'react'

import Footer from './Footer'
import Landing from './Landing'

import '../style/fullBody.scss'

class App extends Component {
	constructor(){
		super()
		this.state = {
			sdkLoaded: false,
			fbid: null,
			fbToken: null,
			fbMounted: false,
		}
	}

	componentDidMount(){
		window.fbAsyncInit = () => {
			FB.init({
				appId : '924514381017609',
				cookie : true,
				xfbml : true,
				version : 'v2.8'
			});
			FB.AppEvents.logPageView();
			FB.getLoginStatus( (status) => {
				if(status.status == "connected"){
					this.changeAppState(status.authResponse)
				}
			})
		}

		const loadSDK = (d, s, id) => {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			fjs.parentNode.insertBefore(js, fjs);
			js.onload = ()=>{this.setState({sdkLoaded:true})}
			js.src = "//connect.facebook.net/en_US/sdk.js";
		}
		loadSDK(document, 'script', 'facebook-jssdk');
	}

	render(){
		if (!this.state.sdkLoaded){
			return (<p> Initializing ... </p>)
		}else if(!this.state.fbid){
			return (<Landing fbid={this.state.fbid} login={this.login.bind(this)} routes={this.props.routes}/>)
		}else{
			const cs = React.cloneElement( this.props.children, {
				fbid: this.state.fbid,
				fbToken: this.state.fbToken,
				fbMounted: this.state.fbMounted,
				login: this.login.bind(this)
			})
			return (<div> {cs} <Footer /> </div>)
		}
	}

	login(then){
		FB.login(
			(loginResponse)=>{
				this.changeAppState(loginResponse.authResponse),
				then(loginResponse)
			},{scope:'email, user_friends'}
		)
	}

	changeAppState(authResponse){
		this.setState({
			fbid: authResponse.userID,
			fbToken: authResponse.accessToken,
			fbMounted: true,
		});
	}
}

export default App