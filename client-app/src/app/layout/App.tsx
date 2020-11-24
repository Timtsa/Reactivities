import React, { useState, useEffect, Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css';

import { Container } from 'semantic-ui-react'
import axios from 'axios';
import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';



const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0])
  }
  const handleOpencreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }
  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/Activities').then(response => {
    let activities:IActivity[]=[]
response.data.forEach(activity=>
  { 
    activity.date=activity.date.split('.')[0];
    activities.push(activity);
  })
    setActivities(activities);
    })
  }, [])
  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }
const handleDeleteActivity = (id:string)=>{
  setActivities([...activities.filter(a=>a.id!==id)])
}

  return (
    <Fragment >
      <NavBar openCreateForm={handleOpencreateForm} />
      <Container style={{ marginTop: '4em' }}>
      </Container>
      <ActivityDashboard activities={activities}
        selectActivity={handleSelectActivity}
        selectedActivity={selectedActivity!}
        editMode={editMode}
        setEditMode={setEditMode}
        setSelectedActivity={setSelectedActivity}
        createActivity={handleCreateActivity}
        editActivity={handleEditActivity}
        deleteActivity={handleDeleteActivity}
      />
    </Fragment>
  );
}


export default App;
