import { observer } from 'mobx-react-lite';
import React, { useContext,useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, ButtonGroup, Card, Image } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityStore from '../../../app/stores/activityStore';

interface DetailParams {
  id: string
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({ match,history }) => {
  const activityStore = useContext(ActivityStore);
  const { selectedActivity: activity, openEditForm, cancelSelectedActivity, loadActivity,loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id)
  },[loadActivity, match.params.id])

  if(loadingInitial ||!activity)return<LoadingComponent content='Loading activity...'/>
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity!.category}.jpg`}
        wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span >{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <ButtonGroup>
          <Button basic
          as={Link} to={`/manage/${activity.id}`}
          color="blue" content="Edit"></Button>
          <Button basic onClick={()=>history.push('/activities')} color="grey" content="Cancel"></Button>
        </ButtonGroup>
      </Card.Content>
    </Card>
  )
}
export default observer(ActivityDetails);

