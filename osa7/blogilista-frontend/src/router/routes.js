import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Blogs from '../views/Blogs'
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
                <Blogs />
            </Route>
        </Switch>
    )
}

export default Routes
