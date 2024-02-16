import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import { UseStore } from '../store/store';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import Home from '../../featuers/Home/Home'; 
import { ToastContainer } from 'react-toastify';
import ModalContainer from '../common/modals/ModalContainer';
// import 'react-calendar/dist/Calendar.css';
function App() {
  const { commonStore,userStore } = UseStore();
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(()=>commonStore.setAppLoded());
    }else{
      commonStore.setAppLoded()
    }

  }, [commonStore,userStore])



  const location = useLocation();

  if (!commonStore.appLoaded) return (<>Loading</>)
  return (
    <>
    <ModalContainer/>
    <ToastContainer  position='bottom-right' theme='colored' />
    {
      location.pathname==='/'?(<Home/>):<> <Navbar />
      <Container style={{ marginTop: '7em' }} >
        <Outlet />
      </Container ></>
    }
     
    </>
  );
}

export default observer(App);
