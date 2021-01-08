import { makeObservable, observable, action, computed, configure, runInAction, makeAutoObservable } from "mobx";
import { SyntheticEvent } from "react";
import { createContext } from "react";
import agent from "../api/agent";
import { IActivity } from "../models/activity";

configure({ enforceActions: 'always' });

class ActivityStore {

  activityRegistry = new Map();
  activities: IActivity[] = [];
  loadingInitial = false;
  selectedActivity: IActivity | undefined;
  editMode = false;
  submitting = false;
  target = '';

  constructor() {

    makeObservable(this, {
      activityRegistry: observable,
      activities: observable,
      loadingInitial: observable,
      selectedActivity: observable,
      editMode: observable,
      submitting: observable,
      target: observable,
      activitiesByDate: computed,
      loadActivities: action,
      createActivity: action,
      opencCreateForm: action,
      selectActivity: action.bound,
      openEditForm: action,
      cancelSelectedActivity: action,
      cancelFormOpen: action,
      editActivity: action,
      deleteActivity: action
    })
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values())
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction(() => {
        activities.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      })

    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      })
    }
  };


  createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.editMode = false;
        this.submitting = false;
      })
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      })
      console.log(error);
    }
  };

  opencCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined
  }
  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;

  }
  openEditForm = (id: string) => {
    this.selectActivity = this.activityRegistry.get(id);
    this.editMode = true;
  }

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  }

  cancelFormOpen = () => {
    this.editMode = false;
  }

  editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.selectedActivity = activity;
        this.activityRegistry.set(activity.id, activity);
        this.editMode = false;
        this.submitting = false;
      })

    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      })
      console.log(error);
    }
  };



  deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  };


}

export default createContext(new ActivityStore())