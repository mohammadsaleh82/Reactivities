import { observer } from "mobx-react-lite";
import { Card, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../App/Models/profile";
import { Link } from "react-router-dom";

interface Props {
  profile: Profile;
}
const ProfileCard = ({ profile }: Props) => {
  return (
    <Card as={Link} to={"/profiles/" + profile.userName}>
      <Image src={profile.image || "assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>{profile.bio}</Card.Description>
      </Card.Content>
      <Card.Content>
        <Icon name="user" />
        20 folowers
      </Card.Content>
    </Card>
  );
};

export default observer(ProfileCard);
