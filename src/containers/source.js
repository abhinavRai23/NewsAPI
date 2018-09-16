import React from "react"
import { Row, Col, Card, CardTitle, CardPanel, Button } from 'react-materialize'
import { Link } from 'react-router-dom'
import { getData } from "../components/utility";
import { ApiKey } from "../components/global";

export default class Sources extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            selected_type: "top-headlines",
            query: "",
            selected_sources: "",
            filters: {
                type: ['top-headlines', 'everything', 'sources'],
                sources: [],
                countries: [],
                categories: [],
                languages: []
            }
        }
        this.handleEnter = this.handleEnter.bind(this)
        this.getArticles = this.getArticles.bind(this)
    }
    handleEnter(e) {
        if (e.key === "Enter") {
            this.handleSubmit()
        }
    }
    getArticles(){
        getData('top-headlines?sources=' + this.props.history.location.pathname.slice(1) + '&apiKey=' + ApiKey)
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
    componentDidMount() {
        console.log(this.props.history.location.pathname)
        this.getArticles()
    }
    render() {
        return (
            <div className="container">
                <Row>
                    <Col s={12}>
                        <h4 className="center">Newsletters</h4>
                    </Col>
                    <Col>
                        <Link to="/"><Button>Go Back</Button></Link>
                    </Col>
                </Row>
                <Row className='flex'>
                    {
                        this.state.articles.map((article, index) => {
                            return (
                                <Col s={12} m={4} key={index}>
                                    <div className="card">
                                        <div className="card-image waves-effect waves-block waves-light">
                                            <img src={article.urlToImage} />
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
