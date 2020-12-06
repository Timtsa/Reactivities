import { observer } from 'mobx-react-lite';
import React,{Component, useContext} from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import ActivityStore from '../../app/stores/activityStore'

   

export const NavBar: React.FC = () => {
    const activityStore =useContext(ActivityStore);
    return (
        <div>
              <Menu fixed = 'top' inverted>
                  <Container>
                  <Menu.Item header>
                      <img src="/assets/logo.png" alt="logo" ></img> Reactivities </Menu.Item>
        <Menu.Item  name='messages'/>
        <Menu.Item >
            <Button onClick={activityStore.opencCreateForm} positive content="Create Activity"/>
            </Menu.Item> 

                  </Container>
      
      </Menu>
        </div>
    )
}
export default observer(NavBar);