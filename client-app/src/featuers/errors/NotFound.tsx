import { Link } from "react-router-dom"
import { Button, Header, Icon, Segment } from "semantic-ui-react"

const NotFound = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="search"/>
                Ops - Weve locked everyewhere but could not find what you are looking for
            </Header>
            <Segment.Inline>
                <Button color="green" as={Link} to='/activities'>
                go to activities
                </Button>
            </Segment.Inline>
        </Segment>
    )
}

export default NotFound