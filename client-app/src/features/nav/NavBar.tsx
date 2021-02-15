
import { observer } from 'mobx-react-lite';
import React,{ useContext} from 'react'
import { Link } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'
import ActivityStore from '../../app/stores/activityStore'

   

export const NavBar: React.FC = () => {
    const activityStore =useContext(ActivityStore);
    return (
        <div>
              <Menu fixed = 'top' inverted>
                  <Container>
                  <Menu.Item header as ={Link} to='/'>
                      <img src="/assets/logo.png" alt="logo" ></img> Reactivities </Menu.Item>
       
       <Menu.Item name ='Activities' as={Link} to='/activities'/>
       
        <Menu.Item >
            <Button
             as={Link} to='/createActvity'
             positive content="Create Activity"/>
            </Menu.Item> 

                  </Container>
      
      </Menu>
        </div>
    )
}
export default observer(NavBar);