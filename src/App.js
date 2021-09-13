import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import styles from "./App.module.css";
import Home from "./page/Home";
import SubDir from "./page/SubDir";

function App() {
    return (
        <div className={styles[`App`]}>
            <header className={styles[`App-header`]}>
                <Router>
                    <Switch>
                        <Route exact path={`/`} component={Home}/>
                        <Route path={`/:id`} component={SubDir}/>
                    </Switch>
                </Router>
            </header>
        </div>
    );
}


export default App;
