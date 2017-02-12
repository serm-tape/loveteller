import React, {Component} from "react"
import {Link} from "react-router"

const linkStyle={
    color:'white',
    float: 'right',
    margin: 2,
}
const Footer = () => {
    return (
        <div style={{height:'5vh', width:'100%', backgroundColor:'#B0B0B0', position:'absolute', bottom:'0vh'}}>
            <Link style={linkStyle} to='/about'> About </Link>
            <Link style={linkStyle} to='/'> Home </Link>
            <Link style={{float:'left', color:'black', margin:2}} to='/'> Love Teller </Link>
        </div>
    )
}

export default Footer
