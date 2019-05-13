import React from 'react';
import ReactDOM from 'react-dom';

import './sass/main.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ScrollToTop from './components/Utility/ScrollToTop/ScrollToTop';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import dynamicFormItemReducer from './store/reducers/dynamicFormItem';
import recomendationReducer from './store/reducers/getRecommendations';
import tagReducer from './store/reducers/tags';
import snapShotsReducer from './store/reducers/picturesWall';
import videoReducer from './store/reducers/videoFile';
import searchReducer from './store/reducers/search';
import cartReducer from './store/reducers/cart';
import fileReducer from './store/reducers/file';
import filterReducer from './store/reducers/filter';
//import billingReducer from './store/reducers/billing';
import { StripeProvider } from 'react-stripe-elements';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
    recomendationReducer: recomendationReducer,
    authReducer: authReducer,
    dynamicFormItemReducer: dynamicFormItemReducer,
    tagReducer: tagReducer,
    snapShotsReducer: snapShotsReducer,
    videoReducer: videoReducer,
    searchReducer: searchReducer,
    cartReducer: cartReducer,
    fileReducer: fileReducer,
    filterReducer: filterReducer
});

const store = createStore(rootReducers, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <StripeProvider apiKey="pk_test_YXxx1T8deII1T8khvrDi5Rbm00bcuvihrb">
        <Provider store={store}>
            <BrowserRouter basename='/'>
                <ScrollToTop >
                    <ScrollUpButton ContainerClassName="bg-white border" />
                    <App />
                </ScrollToTop>
            </BrowserRouter>
        </Provider>
    </StripeProvider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
