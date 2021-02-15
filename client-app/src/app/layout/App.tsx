import React, { useEffect, Fragment, useContext } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react'
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../stores/activityStore';
import { observer } from 'mobx-react-lite';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import { ActivityForm } from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities()
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent />

  return (
    <Fragment >
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'}
        render={() => (
          <Fragment >
            <NavBar />
            <Container style={{ marginTop: '4em' }}>
            <Route exact path='/activities' component={ActivityDashboard} />
              <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActvity', '/manage/:id']} component={ActivityForm} />
            </Container>
          </Fragment>
        )} />

    </Fragment>
  );
};


export default withRouter(observer(App));
