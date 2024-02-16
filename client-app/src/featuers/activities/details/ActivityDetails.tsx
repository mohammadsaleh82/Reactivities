import { useEffect } from 'react'
import { Grid } from 'semantic-ui-react';
import { UseStore } from '../../../App/store/store';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

const ActivityDetails = () => {
    const { activityStore } = UseStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity])

    if (loadingInitial || !activity) return <>loading</>;

    return (
        <Grid>
            <Grid.Column width={'10'} >
                <ActivityDetailedHeader  activity={activity}/>
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat  activityId={activity.id}/>
            </Grid.Column>
            <Grid.Column width={'6'}>
                <ActivityDetailedSidebar activity={activity} />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetails)