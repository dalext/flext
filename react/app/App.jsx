/*!
 *
 * Science-CX - Bootstrap Admin App + ReactJS
 *
 * Version: 3.6
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory, useRouterHistory, IndexRoute } from 'react-router';
import { createHistory } from 'history';

import Home from './components/Home/Home';

import BaseHorizontal from './components/Layout/BaseHorizontal';

import SingleView from './components/SingleView/SingleView';
import SubMenu from './components/SubMenu/SubMenu';

// Application Styles
import './styles/bootstrap.scss';
import './styles/app.scss'

// Editor
import Editor from './components/Pages/Editor';

// Pages
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Recover from './components/Pages/Recover';
import Lock from './components/Pages/Lock';
import NotFound from './components/Pages/NotFound';
import Error500 from './components/Pages/Error500';
import Maintenance from './components/Pages/Maintenance';

// Init css loader (for themes)
// initLoadThemes();

// Disable warning "Synchronous XMLHttpRequest on the main thread is deprecated.."
$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    options.async = true;
});

// specify basename below if running in a subdirectory or set as "/" if app runs in root
const appHistory = useRouterHistory(createHistory)({
  basename: WP_BASE_HREF
})

ReactDOM.render(
    <Router history={appHistory}>
        <Route path="/" component={BaseHorizontal}>
            {/* Default route*/}
            <IndexRoute component={Home} />
            <Route path="singleview" component={SingleView}/>
            <Route path="submenu" component={SubMenu}/>
        </Route>
        {/*Pages*/}
        <Route path="/" component={BaseHorizontal}>
            <Route path="login" component={Login}/>
            <Route path="editor" component={Editor}/>
            <Route path="register" component={Register}/>
            <Route path="recover" component={Recover}/>
            <Route path="lock" component={Lock}/>
            <Route path="notfound" component={NotFound}/>
            <Route path="error500" component={Error500}/>
            <Route path="maintenance" component={Maintenance}/>
        </Route>
        
        {/* Not found handler */}
        <Route path="*" component={NotFound}/>

    </Router>,
    document.getElementById('app')
);

