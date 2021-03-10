import React from 'react'
import { withRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from "layouts/Login.js";
import AdminLayout from "layouts/Admin.js";
import generateStores from './redux/store'
import { Provider } from 'react-redux'
const store = generateStores()

function App(props) {
    return (
        <>
            <div className="wrapper">
                {
                    localStorage.getItem("usuario:") === null 
                    ? <Login />
                    : <Switch>
                        <Provider store={store}>
                            <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
                            <Redirect to="/admin/dashboard" />
                        </Provider>
                      </Switch>
                }
            </div>
        </>
    );
}

export default withRouter(App);