import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react'
import { UseStore } from '../../App/store/store'
import LoginForm from '../users/LoginForm'
import RegisterForm from '../users/RegisterForm'

const Home = () => {
  const { userStore, modalStore } = UseStore()
  return (
    <Segment inverted textAlign='center' vertical className='masthead' >
      <Container text>
        {userStore.isLoggedIn ? (<>
          <Header as='h1' inverted>
            <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
            Reactivities
          </Header>
          <Header as='h2' inverted content={`Welcome back  `} />
          <Button as={Link} to='/activities' size='huge' inverted>
            Go To Activities
          </Button>
        </>) : (<>
          <Header as='h2' inverted content={`Welcome back  `} />
          <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
            Login!
          </Button>
          <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
            Register
          </Button>
        </>)}
      </Container>
    </Segment>

  )
}

export default observer(Home)