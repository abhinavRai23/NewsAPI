import React from "react"
import { Row, Col, Input } from 'react-materialize'
import { Link, withRouter } from 'react-router-dom'
import { getData } from "../components/utility";
import { ApiKey } from "../components/global";
import { connect } from "react-redux"
import { ChooseCategory, ChooseCountry, AddOptions } from "../actions/filters";

class Sources extends React.Component {
	constructor(props) {
		super(props)
		let { selected_country, selected_category, options } = this.props.filters
		this.state = {
			sources: [],
			backup: options.all_sources,
			selected_country: selected_country,
			selected_category: selected_category,
			filters: {
				...options
			}
		}
		this.handleEnter = this.handleEnter.bind(this)
		this.handleChanges = this.handleChanges.bind(this)
		this.getSources = this.getSources.bind(this)
		this.filtersSource = this.filtersSource.bind(this)
	}
	handleChanges(e) {
		let name = e.target.name
		let value = e.target.value
		this.setState({ [name]: value })
		let sources = this.state.backup
		if (name == "selected_category") {
			this.props.ChooseCategory(value)
		}
		else if (name == 'selected_country') {
			this.props.ChooseCountry(value)
		}
		this.filtersSource()
	}
	filtersSource() {
		let sources = this.state.backup
		if (this.state.selected_category != "") {
			sources = sources.filter(source => source.category == this.state.selected_category.toLowerCase())
		}
		if (this.state.selected_country != "") {
			sources = sources.filter(source => source.country == this.state.selected_country.toLowerCase())
		}
		this.setState({ sources })
	}
	getSources() {
		getData('sources?apiKey=' + ApiKey).then(data => {
			if (data.status == 'ok') {
				var all_countries = [], all_categories = [], all_sources = []
				data.sources.forEach(source => {
					all_sources.push(source.id)
					if (all_countries.indexOf(source.country) < 0) {
						all_countries.push(source.country)
					}
					if (all_categories.indexOf(source.category) < 0) {
						all_categories.push(source.category)
					}
				})
				this.setState({ sources: data.sources, backup: data.sources, filters: { all_countries, all_categories } })
				this.props.AddOptions({ all_sources, all_categories, all_countries })
				this.filtersSource()
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
	componentDidUpdate(){
		Materialize.updateTextFields();
	}
	componentDidMount() {
		this.getSources()
	}
	render() {
		let { selected_country, selected_category, sources, filters } = this.state
		console.log(filters)
		return (
			<div className="container">
				<Row>
					<Col s={12}>
						<h4 className="center"><u>Sources</u></h4>
					</Col>
				</Row>
				<Row>
					<Col s={12} m={2}>
						<h5>Filters:</h5>
					</Col>
					<Col s={12} m={5}>
						<Input s={12} type='select' label="Country" name="selected_country" onChange={this.handleChanges} value={selected_country}>
							<option value="" disabled>Choose</option>
							{
								filters.all_countries.map((value) => {
									return (
										<option key={value} value={value}>{value.toUpperCase()}</option>
									)
								})
							}
						</Input>
					</Col>
					<Col s={12} m={5}>
						<Input s={12} type='select' label="Category" name="selected_category" onChange={this.handleChanges} value={selected_category}>
							<option value="" disabled>Choose</option>
							{
								filters.all_categories.map((value) => {
									return (
										<option key={value} value={value}>{value.toUpperCase()}</option>
									)
								})
							}
						</Input>
					</Col>
				</Row>
				<Row className='flex'>
					{
						sources.map((source, index) => {
							return (
								<Col s={12} m={3} key={index} className='source-list'>
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
		ChooseCountry: (value) => {
			dispatch(ChooseCountry(value))
		},
		AddOptions: (object) => {
			dispatch(AddOptions(object))
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sources))
