import React from "react"
import { Row, Col, Input } from 'react-materialize'
import { Link, withRouter } from 'react-router-dom'
import { getData } from "../components/utility";
import { ApiKey } from "../components/global";
import { connect } from "react-redux"
import { ChooseCategory, ChooseLanguage, ChooseCountry, AddOptions } from "../actions/filters";

class Sources extends React.Component {
	constructor(props) {
		super(props)
		let { selected_country, selected_category, selected_language, options } = this.props.filters
		this.state = {
			sources: [],
			backup: [],
			selected_country: selected_country,
			selected_category: selected_category,
			selected_language: selected_language,
			filters: {
				...options
			}
		}
		this.handleEnter = this.handleEnter.bind(this)
		this.handleChanges = this.handleChanges.bind(this)
		this.getSources = this.getSources.bind(this)
	}
	handleChanges(e) {
		let name = e.target.name
		let value = e.target.value
		this.setState({ [name]: value })
		let sources = this.state.backup
		if (this.state.selected_category != "") {
			sources = sources.filter(source => source.selected_category == this.state.selected_category.toLowerCase())
		}
		if (this.state.selected_language != "") {
			sources = sources.filter(source => source.selected_language == this.state.selected_language.toLowerCase())
		}
		if (this.state.selected_country != "") {
			sources = sources.filter(source => source.selected_country == this.state.selected_country.toLowerCase())
		}
		this.setState({ sources })
		if(name=="selected_category"){
			this.props.ChooseCategory(value)
		}
		else if(name=='selected_country'){
			this.props.ChooseCountry(value)
		}
		else{
			this.props.ChooseLanguage(value)
		}
	}
	getSources() {
		getData('sources?apiKey=' + ApiKey).then(data => {
			if (data.status == 'ok') {
				let { all_countries, all_categories, all_languages } = this.state.filters
				data.sources.forEach(source => {
					if (all_countries.indexOf(source.selected_country) < 0) {
						all_countries.push(source.selected_country)
					}
					if (all_categories.indexOf(source.selected_category) < 0) {
						all_categories.push(source.selected_category)
					}
					if (all_languages.indexOf(source.selected_language) < 0) {
						all_languages.push(source.selected_language)
					}
				})
				this.setState({ sources: data.sources, backup: data.sources, filters: { all_countries, all_categories, all_languages } })
			}
			else {
				console.log(data)
				alert('Something Went wrong.')
			}
		})
	}
	handleEnter(e) {
		if (e.key === "Enter") {
			this.handleSubmit()
		}
	}
	componentDidMount() {
		if (this.state.sources.length == 0) {
			this.getSources()
		}
	}
	render() {
		let { selected_country, selected_category, selected_language, sources, filters } = this.state
		return (
			<div className="container">
				<Row>
					<Col s={12}>
						<h4 className="center"><u>Sources</u></h4>
					</Col>
				</Row>
				{/* <Row>
					<Col s={12} m={3}>
						<h5>Filters:</h5>
					</Col>
					<Col s={12} m={3}>
						<Input s={12} type='select' label="Country" name="selected_country" onChange={this.handleChanges} defaultValue={selected_country}>
							<option value="" disabled>Choose</option>
							{
								filters.all_countries.length>0 && filters.all_countries.map((value) => {
									return (
										<option key={value} key={value}>{value.toUpperCase()}</option>
									)
								})
							}
						</Input>
					</Col>
					<Col s={12} m={3}>
						<Input s={12} type='select' label="Category" name="selected_category" onChange={this.handleChanges} defaultValue={selected_category}>
							<option value="" disabled>Choose</option>
							{
								filters.all_categories.map((value) => {
									return (
										<option key={value} key={value}>{value.toUpperCase()}</option>
									)
								})
							}
						</Input>
					</Col>
					<Col s={12} m={3}>
						<Input s={12} type='select' label="Language" name="selected_language" onChange={this.handleChanges} defaultValue={selected_language}>
							<option value="" disabled>Choose</option>
							{
								filters.all_languages.map((value) => {
									return (
										<option key={value} key={value}>{value.toUpperCase()}</option>
									)
								})
							}
						</Input>
					</Col>
				</Row> */}
				<Row className='flex'>
					{
						sources.map((source, index) => {
							return (
								<Col s={2} m={3} key={index} className='source-list'>
									<Link to={'/' + source.id}>{source.name}</Link>
								</Col>
							)
						})
					}
				</Row>
				{
					sources.length == 0 ?
						<p className="center red-text">*No result Found</p>
						: null
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		filters: state.Filters
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		ChooseCategory: (value) => {
			dispatch(ChooseCategory(value))
		},
		ChooseLanguage: (value) => {
			dispatch(ChooseLanguage(value))
		},
		ChooseCountry: (value) => {
			dispatch(ChooseCountry(value))
		},
		AddOptions: (object) => {
			dispatch(AddOptions(object))
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sources))
