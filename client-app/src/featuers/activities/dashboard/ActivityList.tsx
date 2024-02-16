import { Fragment } from 'react'
import { Header } from 'semantic-ui-react'
import { UseStore } from '../../../App/store/store';
import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem';

const ActivityList = () => {

    const { activityStore } = UseStore();
    const { groupedActivities } = activityStore;

    return (
        <>
            {
                groupedActivities.map(([group, activities]) => (
                    <Fragment key={group}>
                        <Header sub color='teal'>
                            {group}
                        </Header>

                        {activities.map(activity => (
                            <ActivityListItem activity={activity} key={activity.id} />
                        ))}

                    </Fragment>
                ))
            }
        </>
    )
}

export default observer(ActivityList)