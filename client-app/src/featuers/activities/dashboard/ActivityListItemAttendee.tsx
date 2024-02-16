import { Image, List, Popup } from "semantic-ui-react";
import { Profile } from "../../../App/Models/profile";
import { Link } from "react-router-dom";
import ProfileCard from "../../Profiles/ProfileCard";

interface Props {
  attendees?: Profile[];
}
const ActivityListItemAttendee = ({ attendees }: Props) => {
  return (
    <List horizontal>
      {attendees?.map((item) => (
        <Popup
          key={item.userName}
          trigger={
            <List.Item
              key={item.userName}
              as={Link}
              to={"/profiles/" + item.userName}
            >
              <Image
                size="mini"
                circular
                src={item.image || "/assets/user.png"}
              />
            </List.Item>
          } 
          hoverable
        >
          <Popup.Content>
            <ProfileCard profile={item}/>
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
};

export default ActivityListItemAttendee;
