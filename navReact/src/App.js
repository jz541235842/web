import React from 'react'
import {Provider} from "react-redux"
import store from "./store"
import Router from "./router"
import 'antd/dist/antd.css'

class App extends React.Component {
  render() {
    return (
     <Provider store={store}>
       <Router/>
     </Provider>
    );
  }
}

export default App;