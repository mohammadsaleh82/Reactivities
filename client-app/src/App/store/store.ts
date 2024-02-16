import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";
import commonStore from "./commonStore";
import UserStore from "./userStore";
import modalStore from "./modalStore";
import CommentStore from "./commentStore";

interface Store {
    activityStore: ActivityStore;
    commonStore:commonStore;
    userStore:UserStore;
    modalStore:modalStore;
    commentStore:CommentStore
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore:new commonStore(),
    userStore:new UserStore(),
    modalStore:new modalStore(),
    commentStore:new CommentStore()
}

export const StoreContext = createContext(store);

export const UseStore = () => {
    return useContext(StoreContext)
}