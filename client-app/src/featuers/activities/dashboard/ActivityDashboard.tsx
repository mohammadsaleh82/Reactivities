import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react' 
import ActivityList from './ActivityList' 
import { observer } from 'mobx-react-lite'
import ActivityFilters from './ActivityFilters'
import { UseStore } from '../../../App/store/store'
 
const ActivityDashboard = () => { 
    const { activityStore } = UseStore();
    useEffect(() => {
        activityStore.loadActivities()
    }, [activityStore])

    if(activityStore.loading) return <>Loading Activities....</>
    return (
        <Grid>
            <Grid.Column width={'10'}  >
                <ActivityList  />

            </Grid.Column>
            <Grid.Column width={'6'}  >
              <ActivityFilters/>
            </Grid.Column>
        </Grid>
    )
}

export default  observer(ActivityDashboard) ;