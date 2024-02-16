import { observer } from "mobx-react-lite";
import { Segment, Header, Comment, Button } from "semantic-ui-react";
import { UseStore } from "../../../App/store/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import MyTextArea from "../../../App/common/form/MyTextArea";

interface Props {
  activityId: string;
}
export default observer(function ActivityDetailedChat({ activityId }: Props) {
  const { commentStore } = UseStore();
  useEffect(() => {
    if (activityId) {
      commentStore.createHubConnection(activityId);
    }
    return () => {
      commentStore.clearComments();
    };
  }, [commentStore, activityId]);
  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {commentStore.comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src="/assets/user.png" />
              <Comment.Content>
                <Comment.Author as={Link} to={`/Profiles/${comment.username}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{comment.createdAt}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}

          <Formik
            onSubmit={(values, { resetForm }) => {
              commentStore.addComment(values).then(() => resetForm());
            }}
            initialValues={{ body: "" }}
          >
            {({ isSubmitting, isValid }) => (
              <Form className="ui form">
                <MyTextArea name="body" placeholder="Add Comment" rows={2} />
                <Button
                  loading={isSubmitting}
                  disabled={isSubmitting || !isValid}
                  content="Add Reply"
                  labelPosition="left"
                  icon="edit"
                  primary
                  type="submit"
                />
              </Form>
            )}
          </Formik>
        </Comment.Group>
      </Segment>
    </>
  );
});
