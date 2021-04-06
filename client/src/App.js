import { useContext, useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Contexts.
import { UserContext } from './contexts/userContext';

// Pages.
import LandingPage from './pages/LandingPage';
import TemplatePage from './pages/Templates/TemplatePage';
import ProfilePage from './pages/ProfilePage';
import MyLinkPage from './pages/MyLinkPage';
import TemplateView from './pages/Templates/TemplateView';
import Logout from './pages/Logout';

// Components.
import DashboardLayout from './components/Layouts/DashboardLayout';

// Configs.
import { setAuthToken, API } from './config/api';
import CreateTemplateContent from './pages/Templates/CreateTemplateContent';

// Set token.
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
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
    <>
      {!loading && (
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route path="/" component={LandingPage} exact />
              {state.isLogin ? (
                <Route path="/dashboard">
                  <DashboardLayout>
                    <Switch>
                      <Route
                        path="/dashboard/template"
                        component={TemplatePage}
                        exact
                      />
                      <Route
                        path="/dashboard/profile"
                        component={ProfilePage}
                        exact
                      />
                      <Route
                        path="/dashboard/my-link"
                        component={MyLinkPage}
                        exact
                      />
                      <Route
                        path="/dashboard/template/create/:id"
                        component={CreateTemplateContent}
                        exact
                      />
                    </Switch>
                  </DashboardLayout>
                </Route>
              ) : (
                <Redirect to="/" />
              )}
              <Route path="/view/:id" component={TemplateView} exact />
              <Route path="/logout" component={Logout} exact />
            </Switch>
          </BrowserRouter>
        </div>
      )}
    </>
  );
}

export default App;
