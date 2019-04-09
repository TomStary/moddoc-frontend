import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();

export const AuthRouter = ({ component: Component, ...rest }) =>  (
    <Route {...rest} render={props => (
            cookie.get('access_token')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
);