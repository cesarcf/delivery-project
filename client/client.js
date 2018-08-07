import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'
import Root from 'components/Root'
import { loadState } from 'store/localStorage'


const render = (Component) => {
	ReactDOM.render(
		<Root initialState={loadState()}>
			<Component />
		</Root>
		,
		document.getElementById('root')
	)
}

render(App)

// HMR (Hot Module Replacement)
if (module.hot) {
	//console.log('hot reloading active');
	module.hot.accept('./components/App', () => {
		//console.log('...doing hot reload...');
		const NextApp = require('./components/App').default
		//We return to render:
		render(NextApp)
	})
}