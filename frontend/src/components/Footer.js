import { Route } from "react-router"
import { Switch } from "react-router"

export function Footer() {
  return (
    <Switch>
      <Route path='/main'>
        <footer className="footer container">
          <p className="footer__copyright">© 2021 Mesto Russia</p>
        </footer>
      </Route>
    </Switch> 
  )
}