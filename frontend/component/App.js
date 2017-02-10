import React, { Component } from 'react'

class App extends Component {
	constructor(){
		super()
		this.state = {
			sdkLoaded: false,
			fbid: null,
			fbToken: null,
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
		}else{
			const cs = React.cloneElement( this.props.children, {
				fbid: this.state.fbid,
				fbToken: this.state.fbToken,
				login: this.login.bind(this)
			})
			return cs
		}
	}

	login(then){
		FB.login(
			()=>{
				this.changeAppState.bind(this),
				then()
			},{scope:'email, user_friends'}
		)
	}

	changeAppState(authResponse, then){
		this.setState({
			isLoggedIn:true,
			fbid: authResponse.userID,
			fbToken: authResponse.accessToken,
		});
	}
}

export default App