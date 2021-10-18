import { useEffect, useState } from "react";
import { baseUrl } from "../App";
import ActivitiesList from "./ActivitiesList";

const Activities = (props) => {
  const {
    activityId,
    setActivityId,
    user,
    fetchActivities,
    activities,
    fetchRoutinesByActivity,
  } = props;

  useEffect(() => {
    fetchActivities();
  }, []);
  return (
    <div>
      <ActivitiesList
        activities={activities}
        activityId={activityId}
        setActivityId={setActivityId}
        user={user}
        fetchRoutinesByActivity={fetchRoutinesByActivity}
      />
    </div>
  );
};

export default Activities;
