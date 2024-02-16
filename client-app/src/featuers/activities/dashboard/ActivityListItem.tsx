import { SyntheticEvent, useState } from "react";
import { Activity } from "../../../App/Models/Activity";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { UseStore } from "../../../App/store/store";
import ActivityListItemAttendee from "./ActivityListItemAttendee";
interface Props {
  activity: Activity;
}
const ActivityListItem = ({ activity }: Props) => {
  const { activityStore } = UseStore();
  const { deleteActivity, loading } = activityStore;
  const [target, setTarget] = useState("");
  const handleDeleteActivity = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }; 
  
  if (loading) return <>loading</>;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item.Image size="tiny" circular src="/assets/user.png" />
          <Item.Content>
            <Item.Header as={Link} to={`/activities/${activity.id}`}>
              {activity.title}
            </Item.Header>
          </Item.Content>
          <Item.Description>
            Hosted By {activity.host?.displayName}
            
          </Item.Description>
          {activity.isHost && (
            <Item.Description>
              <Label basic color="orange">
                you are hosting this activity
              </Label>
            </Item.Description>
          )}
          {!activity.isHost && activity.isGoing && (
            <Item.Description>
              <Label basic color="green">
                you are going this activity
              </Label>
            </Item.Description>
          )}
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {activity.date!.toISOString().split("T")[0]}
          <Icon name="marker" /> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendee attendees={activity.activityAttendees} />
      </Segment>
      <Segment clearing>
        {activity.description}
        <Button
          as={Link}
          content={"view"}
          color="teal"
          to={`/activities/${activity.id}`}
          floated="right"
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
