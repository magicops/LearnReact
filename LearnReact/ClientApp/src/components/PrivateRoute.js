import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as Auth from '../helpers/Auth';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        Auth.userIsAuthenticated()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)