import React from 'react'
import { Switch, Route } from 'react-router-dom'

import DefaultView from '../views/DefaultView'
import User from '../views/User'
import Users from '../views/Users'
import Blog from '../views/Blog'

const Routes = () => {
    return (
        <Switch>
            <Route path="/blogs/:id">
                <Blog />
            </Route>
            <Route path="/users/:id">
                <User />
            </Route>
            <Route path="/users">
                <Users />
            </Route>
            <Route path="/">
                <DefaultView />
            </Route>
        </Switch>
    )
}

export default Routes
