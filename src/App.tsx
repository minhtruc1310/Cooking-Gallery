import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import AuthRoute from './components/AuthRoute/AuthRoute';
import { auth } from './config/firebase';
import logging from './config/logging';
import routes from './config/routes';

export interface IApplicationProps { }

const App: React.FunctionComponent<IApplicationProps> = props => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user)
            {
                logging.info('User detected.');
            }
            else
            {
                logging.info('No user detected');
            }

            setLoading(false);
        })
    }, []);

    if (loading)
        return <Spinner color="info" />

    return (
        <div>
            <Router>
              <Switch>
                  {routes.map((route, index) => 
                      <Route
                          key={index}
                          path={route.path} 
                          exact={route.exact} 
                          render={(routeProps: RouteComponentProps<any>) => {
                              if (route.protected)
                                  return <AuthRoute><route.component  {...routeProps} /></AuthRoute>;

                              return <route.component  {...routeProps} />;
                          }}
                      />)}
              </Switch>
            </Router>
        </div>
    );
}

export default App;