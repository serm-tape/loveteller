import React, {Component} from "react"
import axios from "axios"

const FriendCard = ({id,name,imgUrl}) => {
	return (
		<div>
			<img src={this.imgUrl} style={{width:72, height:72}} /><br/>
			{this.name}
		</div>
	)
}

export default FriendCard