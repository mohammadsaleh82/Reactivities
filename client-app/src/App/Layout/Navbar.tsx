import { Button, Container, Dropdown, Menu,Image } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom';
import { UseStore } from '../store/store';
import { observer } from 'mobx-react-lite';

 
const Navbar = ( ) => {
    const {userStore:{user,logout}}=UseStore()
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/'>
                    <img src="assets/logo.png" alt="" />
                    Reactivities
                </Menu.Item>
                <Menu.Item  as={NavLink} to='/activities' content='Activities' />
                <Menu.Item as={NavLink} to='/errors' name='Error'/>
                <Menu.Item as={NavLink} to='/createActivity'>
                    <Button  color='green'  content={'Create'} />
                </Menu.Item>
                <Menu.Item position='right'>
                    <Image src={user?.image || 'assets/user.png'} avatar  spaced='right'/>
                    <Dropdown text={user?.displayName} pointing='top left' >
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} text={`Show My Profile`}  to={`/profile/${user?.userName}`} icon='user'/>
                            <Dropdown.Item onClick={logout} text={`Logout`} icon='power'/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default observer(Navbar)