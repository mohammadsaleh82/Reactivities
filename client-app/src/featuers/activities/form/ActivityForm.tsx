import { useEffect, useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { ActivityFormValues } from "../../../App/Models/Activity";
import { UseStore } from "../../../App/store/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup/";
import MyTextInput from "../../../App/common/form/MyTextInput";
import MyTextArea from "../../../App/common/form/MyTextArea";
import MySelectInput from "../../../App/common/form/MySelectInput";
import { categoryOptions } from "../../../App/common/categoryOptions";
import MyDateInput from "../../../App/common/form/MyDateInput";

const ActivityForm = () => {
  const { activityStore } = UseStore();
  const { createActivity, updateActivity, loadActivity } = activityStore;
  const navigate = useNavigate();
  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );
  const validationSchema = Yup.object({
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required"),
    category: Yup.string().required("category is required"),
    city: Yup.string().required("city is required"),
    date: Yup.string().required("date is required"),
    venue: Yup.string().required("venue is required"),
  });
  // const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = event.target;
  //   setActivity({ ...activity, [name]: value });
  // }
  // const handleSubmit = (activity: ActivityFormValues) => {
  //   if (activity.id) {
  //     const model:ActivityFormValues=new ActivityFormValues(activity);
  //     updateActivity(model).then(() =>
  //       navigate("/activities/" + activity.id)
  //     );
  //   } else {
  //     activity.id = uuid();
  //     createActivity(activity).then(() =>
  //       navigate(`/activities/${activity.id}`)
  //     );
  //   }
  // };
  function handleFormSubmit(activity: ActivityFormValues) {
    if (!activity.id) {
        let newActivity = {
            ...activity,
            id: uuid()
        }
        createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
    } else {
        updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    }
}

  const { id } = useParams();
  useEffect(() => {
    if (id)
      loadActivity(id).then((res) => {
        setActivity(new ActivityFormValues(res));
      });
  }, [id, loadActivity]);
  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isSubmitting, dirty, isValid }) => (
          <Form className="ui form" onSubmit={handleSubmit}>
            <MyTextInput name="title" placeholder="title" />
            <MyTextArea
              rows={3}
              name="description"
              placeholder={"Description"}
            />
            <MySelectInput
              options={categoryOptions}
              name="category"
              placeholder={"Category"}
            />
            <MyDateInput
              name="date"
              placeholderText={"Data"}
              showTimeSelect
              timeCaption="time"
              dateFormat={"MMMM d, yyyy h:mm aa"}
            />
            <MyTextInput name="city" placeholder={"City"} />
            <MyTextInput name="venue" placeholder={"Venue"} />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              type="submit"
              color="green"
              basic
              content="Submit"
              floated="right"
            />
            <Button
              loading={isSubmitting}
              as={Link}
              to="/activities"
              color="instagram"
              basic
              content="Cancel"
              floated="right"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
