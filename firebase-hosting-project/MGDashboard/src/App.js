import React from 'react';
import MainPage from "./MainPage";

// styles for this kit
// import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss";
import "./assets/demo/demo.css";

import {BrowserRouter} from 'react-router-dom'

// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ;
// const store = createStore(rootReducer)
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

function App() {
    return (
        <BrowserRouter>
            <MainPage/>
        </BrowserRouter>
    );
}

export default App;
