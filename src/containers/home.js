import React from "react"
import {Row, Col, Card} from 'react-materialize'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {
	constructor(props){
		super(props)
		this.state={
			username:"",
			data: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleEnter = this.handleEnter.bind(this)
	}
	handleEnter(e){
		if(e.key==="Enter"){
			this.handleSubmit()
		}
	}
	handleSubmit(){
		if(this.state.username!=""){
			this.props.history.push("/"+this.state.username)
		}
	}
	render() {
		return (
			<div className="container">
				<Row>
					<Col s={12}>
						<h5 className="center">Newsletters</h5>
					</Col>
				</Row>
			</div>
		)
	}
}
