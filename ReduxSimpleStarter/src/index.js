import _ from 'lodash'
import React from 'react';
import ReactDom from 'react-dom';
import YTSearch from 'youtube-api-search';
import { apiKey } from '../config.js';

import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';



class App extends React.Component {
	constructor(){
		super()
		this.state = {
			videos: [],
			selectedVideo: null
		}
		this.videoSearch('sports')
	}

	videoSearch(term){
		YTSearch({ key: apiKey, term: term } ,
			(videos) => {
				this.setState({
					videos: videos,
					selectedVideo: videos[0]
				})
		})
	}

	render() {
		console.log(this.state)
		const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300);
		return (
			<div>
				<SearchBar onSearchTermChange = {videoSearch}/>
				<VideoList videos={this.state.videos}/>
			</div>
			)
	}
}

ReactDom.render(<App/>, document.querySelector('.container'))