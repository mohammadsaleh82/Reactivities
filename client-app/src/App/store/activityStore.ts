import { makeAutoObservable, runInAction } from "mobx";
import { Activity, ActivityFormValues } from "../Models/Activity";
import agent from "../api/agent";
import { store } from "./store";
import { Profile } from "../Models/profile"; 

export default class ActivityStore {
  activitiesRegistery = new Map<string, Activity>();
  selectedActivity?: Activity = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;
  constructor() {
    makeAutoObservable(this);
  }

  loadActivities = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.Activities.list();
      runInAction(() => {
        activities.forEach((activity) => {
          this.setActivity(activity);
        });
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoadingInitial(false);
      });
    }
  };
  get activitiesByDate() {
    return Array.from(this.activitiesRegistery.values()).sort(
      (a, b) => b.date!.getTime() - a.date!.getTime()
    );
  }
  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = activity.date!.toISOString().split("T")[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }
  getActivity = (id: string) => {
    return this.activitiesRegistery.get(id);
  };
  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.setLoadingInitial(true);
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(() => (this.selectedActivity = activity));
        this.setLoadingInitial(false);
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setActivity = (activity: Activity) => {
    const user = store.userStore.user;

    if (user) {
      activity.isGoing = activity.activityAttendees!.some(
        (o) => o.userName === user.userName
      );
      activity.isHost = activity.hostUserName === user.userName;
      activity.host = activity.activityAttendees!.find(
        (x) => x.userName === activity.hostUserName
      );
    }
    activity.date = new Date(activity.date!);
    this.activitiesRegistery.set(activity.id, activity);
  };
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createActivity = async (activity: ActivityFormValues) => {
    const user = store.userStore.user;
    var attendee = new Profile(user!);
    try {
      await agent.Activities.create(activity);
      let newActivity = new Activity(activity);
      newActivity.hostUserName = user!.userName;
      newActivity.activityAttendees = [attendee];
      this.setActivity(newActivity);
      runInAction(() => {
        this.selectedActivity = newActivity;
      });
    } catch (error) {}
  };

  updateActivity = async (activity: ActivityFormValues) => {
    debugger;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        if (activity.id) {
          let updateActivity = {
            ...this.getActivity(activity.id),
            ...activity,
          };
          this.activitiesRegistery.set(activity.id, updateActivity as Activity);
          this.selectedActivity = updateActivity as Activity;
        }
      });
    } catch (error) {}
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activitiesRegistery.delete(id);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateAttendance = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        if (this.selectedActivity!.isGoing) {
          this.selectedActivity!.activityAttendees =
            this.selectedActivity!.activityAttendees!.filter(
              (x) => x.userName !== user?.userName
            );
          this.selectedActivity!.isGoing = false;
        } else {
          var attendee = new Profile(user!);
          this.selectedActivity!.activityAttendees!.push(attendee);
          this.selectedActivity!.isGoing = true;
          this.activitiesRegistery.set(
            this.selectedActivity!.id,
            this.selectedActivity!
          );
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  cancelActivityToggle = async () => {
    this.loading = true;
    try {
      await agent.Activities.attend(this.selectedActivity!.id);
      runInAction(() => {
        this.selectedActivity!.isCancelled =
          !this.selectedActivity!.isCancelled;
        this.activitiesRegistery.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  };
}
