import React from "react"
import { Row, Col, Card, CardTitle, CardPanel, Button, Input } from 'react-materialize'
import { Link, withRouter } from 'react-router-dom'
import { getData } from "../components/utility";
import { ApiKey } from "../components/global";
import { connect } from "react-redux"
import { ChooseCategory, ChooseCountry, ChooseSource, AddOptions } from "../actions/filters";
class Source extends React.Component {
    constructor(props) {
        super(props)
        let { selected_country, selected_source, selected_category, options } = this.props.filters
        selected_source = this.props.history.location.pathname.slice(1)
        console.log(selected_source)
        this.state = {
            articles: [],
            selected_source: selected_source,
            selected_country: selected_country,
            selected_category: selected_category,   
            filters: {
                ...options
            }
        }
        this.getArticles = this.getArticles.bind(this)
        this.handleChanges = this.handleChanges.bind(this)
        this.getSources = this.getSources.bind(this)
    }
    getArticles() {
        let {selected_source, selected_category, selected_country} = this.state
        let mustHave = '&language=en&apiKey=' + ApiKey
        let variable
        if(selected_source!=''){
            variable = 'sources='+selected_source
        }
        else{
            variable = 'category='+selected_category+'&country='+selected_country
        }
        let url = "top-headlines" +'?' + variable + mustHave
        getData(url)
            .then(data => {
                if (data.status == 'ok') {
                    this.setState({ articles: data.articles })
                }
                else {
                    console.log(data)
                    alert('Something Went wrong.')
                }
            })
    }
    handleChanges(e) {
        let name = e.target.name
        let value = e.target.value
        this.setState({ [name]: value }, this.getArticles)
        if (name == "selected_category") {
            this.props.ChooseCategory(value)
        }
        else if (name == 'selected_country') {
            this.props.ChooseCountry(value)
        }
        else if (name == 'selected_source') {
            this.props.ChooseSource(value)
        }
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
                this.setState({ filters: { all_countries, all_categories, all_sources } })
                this.props.AddOptions({ all_sources, all_categories, all_countries })
            }
            else {
                console.log(data)
                alert('Something Went wrong.')
            }
        })
    }
    componentDidMount() {
        this.getArticles()
        if(this.state.filters.all_sources.length==0){
            this.getSources()
        }
    }
    render() {
        let { selected_source, selected_country, selected_category, sources, filters } = this.state
        return (
            <div className="container">
                <Row>
                    <Col s={12}>
                        <h4 className="center">Newsletters</h4>
                    </Col>
                </Row>
                <Row>
                    <Col m={2} s={12}>
                        <Link to="/" className="left"><Button>Go Back</Button></Link>
                    </Col>
                    <Col m={10} s={12}>
                        <h5 className="center">Apply Filters</h5>
                    </Col>
                    <Col s={12} m={4}>
                        <Input s={12} type='select' id="source" label="Source" name="selected_source" onChange={this.handleChanges} value={selected_source}>
                            <option value="" className="center"></option>
                            {
                                filters.all_sources.map((value, index) => {
                                    return (
                                        <option key={index} value={value}>{value.toUpperCase()}</option>
                                    )
                                })
                            }
                        </Input>
                    </Col>
                    <Col s={12} m={4}>
                        <Input s={12} type='select' id="country" label="Country" disabled={selected_source != "" ? true : false} name="selected_country" onChange={this.handleChanges} value={selected_country}>
                            <option value="" disabled>Choose</option>
                            {
                                filters.all_countries.map((value, index) => {
                                    return (
                                        <option key={index} value={value}>{value.toUpperCase()}</option>
                                    )
                                })
                            }
                        </Input>
                    </Col>
                    <Col s={12} m={4}>
                        <Input s={12} type='select' id="category" label="Category" disabled={selected_source != "" ? true : false} name="selected_category" onChange={this.handleChanges} value={selected_category}>
                            <option value="" disabled>Choose</option>
                            {
                                filters.all_categories.map((value, index) => {
                                    return (
                                        <option key={index} value={value}>{value.toUpperCase()}</option>
                                    )
                                })
                            }
                        </Input>
                    </Col>
                    <Col s={12}>
                            <span className="right orange-text">*To enable other option choose blank in source (first one)</span>
                    </Col>
                </Row>
                <Row className='flex'>
                    {
                        this.state.articles.map((article, index) => {
                            return (
                                <Col s={12} m={4} key={index}>
                                    <div className="card">
                                        <div className="card-image waves-effect waves-block waves-light">
                                            <a href={article.url} target='_blank'><img src={article.urlToImage} /></a>
                                        </div>
                                        <div className="card-content">
                                            <span className="card-title grey-text text-darken-4">{article.title}</span>
                                            <p>{article.description || article.content}</p>
                                            <p><a href={article.url} target="_blank">read more</a></p>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>
                {
                    this.state.articles.length == 0 ?
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
        ChooseSource: (value) => {
            dispatch(ChooseSource(value))
        },
        AddOptions: (object) => {
            dispatch(AddOptions(object))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Source))