import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const cookie = new Cookies();
console.log(cookie.get('token'))

export const AuthRouter = ({ component: Component, ...rest }) =>  (
    <Route {...rest} render={props => (
            cookie.get('token')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
);