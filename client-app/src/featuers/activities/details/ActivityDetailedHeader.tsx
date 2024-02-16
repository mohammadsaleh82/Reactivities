import { observer } from "mobx-react-lite";
import { Button, Header, Item, Segment, Image, Label } from "semantic-ui-react";
import { Activity } from "../../../App/Models/Activity";
import { Link } from "react-router-dom";
import { UseStore } from "../../../App/store/store";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  activity: Activity;
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {
  const {
    activityStore: { loading, updateAttendance, cancelActivityToggle },
  } = UseStore();
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {activity.isCancelled && (
          <Label
            ribbon
            style={{ zIndex: 1000, position: "absolute", left: -14, top: 20 }}
            content={"Cancelled"}
            color="red"
          />
        )}
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{activity.date!.toISOString().split("T")[0]}</p>
                <p>
                  Hosted by <strong>MS</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {activity.isHost ? (
          <>
            <Button
              basic
              color={activity.isCancelled ? "green" : "red"}
              floated="left"
              content={
                activity.isCancelled
                  ? `Re-activate Activity`
                  : `Cancel Activity`
              }
              onClick={cancelActivityToggle}
              loading={loading}
            />
            <Button
              as={Link}
              to={`/manage/${activity.id}`}
              color="orange"
              floated="right"
            >
              Manage Event
            </Button>
          </>
        ) : activity.isGoing ? (
          <Button onClick={updateAttendance} loading={loading}>
            Cancel attendance
          </Button>
        ) : (
          <Button color="teal" onClick={updateAttendance} loading={loading}>
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
});
