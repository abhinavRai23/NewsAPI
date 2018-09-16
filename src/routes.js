import React from "react"
import { Switch, Route, withRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import { Preloader, Modal } from 'react-materialize'
import { connect } from 'react-redux'
import { history } from './history'

const LoadingPage = ({isLoading, error}) => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    else if (error) {
      return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
      return null;
    }
};
const Sources = Loadable({
	loader: () => import('./containers/sources'),
	loading: LoadingPage,
	delay: 0
})
const Source = Loadable({
	loader: () => import('./containers/source'),
	loading: LoadingPage,
	delay: 0
})

class App extends React.Component{
	componentDidUpdate(){
		window.scrollTo(0, 0)
	}
	componentDidMount(){
		$('#preloader').modal({ dismissible: false });
	}
	render(){
		return(
			<div>
				<Switch>
					<Route exact path='/' component={Sources}/>
					<Route exact path='/:id' component={Source} />
				</Switch>
				<div id="preloader" className="modal">
					<div className="modal-content">
						<Preloader flashing size="big" />
					</div>
				</div>
			</div>
		); 
	}
}

const mapStateToProps = (state) => {
	return {
		routing: state.routing
	}
}

export default withRouter(connect(mapStateToProps)(App))