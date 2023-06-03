import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Header, List, ListItem } from 'semantic-ui-react';
import axios from 'axios';

function App() {
const [activities,setActivities]=useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/api/activity').then(res=>{
      setActivities(res.data)
    })
  }, [])
  return (
    <div >
      <Header as={'h2'} color='red' content={'hello'} />
      <List>
       {activities.map((activity:any)=>(
         <ListItem key={activity.id}>
          {activity.title}
         </ListItem>
       ))}
      </List>
      <Button content='Add' color='green' onClick={()=>setActivities([])} />
    </div>
  );
}

export default App;
