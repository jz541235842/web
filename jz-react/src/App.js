import React,{Component} from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import Router from '@/router';
import store from '@/store';
import '@/assets/css/app.scss';
import '@/assets/css/common.scss';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default hot(App);
