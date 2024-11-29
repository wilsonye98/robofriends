import React from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';

// import { robots } from './robots';

class App extends React.Component {

	constructor(){
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}

		this.onSearchChange = this.onSearchChange.bind(this);
	}

	onSearchChange(event){
		this.setState({
			searchfield: event.target.value
		})
		
	}

	componentDidMount() {
		fetch("https://jsonplaceholder.typicode.com/users")
		.then(resp => resp.json())
		.then(users => {
			this.setState({robots: users})
		})
	}

	render(){
		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
		})

		return (
			<div className="tc">
				<h1 className="f2">RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange} />
				<Scroll>
					<CardList robots={filteredRobots} />
				</Scroll>
			</div>
		)
	}
}

export default App;