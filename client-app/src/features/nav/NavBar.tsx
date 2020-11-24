import React,{Component} from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

interface IProps{
    openCreateForm: ()=>void; 
}
   

export const NavBar: React.FC<IProps> = ({openCreateForm}) => {
    return (
        <div>
              <Menu fixed = 'top' inverted>
                  <Container>
                  <Menu.Item header>
                      <img src="/assets/logo.png" alt="logo" ></img> Reactivities </Menu.Item>
        <Menu.Item  name='messages'/>
        <Menu.Item >
            <Button onClick={openCreateForm} positive content="Create Activity"/>
            </Menu.Item> 

                  </Container>
      
      </Menu>
        </div>
    )
}
