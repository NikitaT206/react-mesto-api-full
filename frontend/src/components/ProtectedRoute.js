import React from "react"
import { Route } from "react-router"
import { Redirect } from "react-router"

function ProtectedRoute ({ component: Component, ...props }) {
  
  return (
    <Route>
      {() =>
        props.loggedIn ? <Component {...props} /> : <Redirect to="./signin" />
      }
    </Route>
  )
}

export default ProtectedRoute;