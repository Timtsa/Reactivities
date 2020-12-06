import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Button, ButtonGroup, Card,  Image } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore';


 const ActivityDetails: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { selectedActivity: activity,openEditForm, cancelSelectedActivity} = activityStore;
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
          <Button basic onClick={() => openEditForm(activity!.id)} color="blue" content="Edit"></Button>
          <Button basic onClick={cancelSelectedActivity} color="grey" content="Cancel"></Button>
        </ButtonGroup>
      </Card.Content>
    </Card>
  )
}
export default observer(ActivityDetails);

