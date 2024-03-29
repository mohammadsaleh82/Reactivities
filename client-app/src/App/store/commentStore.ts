import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { ChatComment } from "../Models/comment";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store"; 

export default class CommentStore {
  comments: ChatComment[] = [];
  hubConnection: HubConnection | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  createHubConnection = (activityId: string) => {
    if (store.activityStore.selectedActivity) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(`http://localhost:5000/chat?activityId=${activityId}`,{
            accessTokenFactory:()=>store.userStore.user?.token!
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();

      this.hubConnection
        .start()
        .catch((error) =>
          console.log("error establishing the connection:", error)
        );

      this.hubConnection.on("LoadComments", (comments: ChatComment[]) => {
        runInAction(() => {
          this.comments = comments;
        });
      });

      this.hubConnection.on("ReceiveComment", (comment: ChatComment) => {
        console.log(comment);
        
        runInAction(() => {
          this.comments.push(comment);
        });
      });
    }
  };

  stopHubConnection = () => {
    this.hubConnection
      ?.stop()
      .catch((error) => console.log("error stoping the connection:", error));
  };

  clearComments = () => {
    this.comments = [];
    this.stopHubConnection();
  };

  addComment =async (values: any) => {
    values.activityId = store.activityStore.selectedActivity?.id;
    try {
        await this.hubConnection?.invoke('SendComment',values)
    } catch (error) {
        console.log(error);
        
    }
  };
}
