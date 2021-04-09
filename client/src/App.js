import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Contexts.
import { UserContext } from './contexts/userContext';

// Configs.
import { setAuthToken, API } from './config/api';

// Layouts.
import DashboardLayout from './components/Layouts/DashboardLayout';

// Pages.
import Home from './pages/Home';
import Template from './pages/Template';
import TemplateContentCreate from './pages/Templates/Create';
import TemplateContentEdit from './pages/Templates/Edit';
import MyLink from './pages/MyLink';
import Profile from './pages/Profile';
import Logout from './pages/Logout';
import TemplateView from './pages/Templates/View';

// Set token.
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // Contexts.
  const [state, dispatch] = useContext(UserContext);

  // States.
  const [loading, setLoading] = useState(true);

  // Queries.
  const validate = async () => {
    try {
      const res = await API.get('/validate');
      dispatch({
        type: 'VALID',
        payloads: {
          token: localStorage.token,
          user: res.data.data.user,
        },
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      dispatch({ type: 'INVALID' });
      setLoading(false);
    }
  };

  useEffect(() => {
    validate();
  }, []);

  return (
    <div className="App">
      {!loading ? (
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/logout" component={Logout} exact />
            <Route path="/view/:link" component={TemplateView} exact />
            <Route path="/dashboard">
              {state.isLogin ? (
                <DashboardLayout>
                  <Switch>
                    <Route
                      path={['/dashboard', '/dashboard/template']}
                      component={Template}
                      exact
                    />
                    <Route
                      path="/dashboard/profile"
                      component={Profile}
                      exact
                    />
                    <Route path="/dashboard/my-link" component={MyLink} exact />
                    <Route
                      path="/dashboard/template/create/:id"
                      component={TemplateContentCreate}
                      exact
                    />
                    <Route
                      path="/dashboard/template/edit/:id"
                      component={TemplateContentEdit}
                      exact
                    />
                  </Switch>
                </DashboardLayout>
              ) : (
                <Redirect to="/" />
              )}
            </Route>
          </Switch>
        </BrowserRouter>
      ) : null}
    </div>
  );
};

export default App;
