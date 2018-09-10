import React from "react"
import { Switch, Route, withRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
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
const Home = Loadable({
	loader: () => import('./containers/home'),
	loading: LoadingPage,
	delay: 0
})

class App extends React.Component{
	componentDidUpdate(){
		window.scrollTo(0, 0)
	}
	render(){
		return(
			<div>
				<Switch>
					<Route exact path='/' component={Home}/>
				</Switch>
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