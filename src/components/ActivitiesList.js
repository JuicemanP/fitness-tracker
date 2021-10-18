import { Link } from "react-router-dom";

const ActivitiesList = (props) => {
  const { activities, setActivityId, user, fetchRoutinesByActivity } = props;
  return (
    <div>
      {activities.map((activity, index) => {
        return (
          <div key={index}>
            <h3>
              <strong>Name:</strong>
              {activity.name}
            </h3>
            <p>
              <strong>Description:</strong>
              {activity.description}
            </p>
            <p>
              {user && (
                <Link
                  value={activity.id}
                  to="/activities/edit"
                  onClick={() => {
                    console.log(activity.id);
                    setActivityId(activity.id);
                  }}
                >
                  Edit Activity |
                </Link>
              )}
              <Link
                to="/activities/routinesByActivity"
                value={activity.id}
                onClick={() => {
                  setActivityId(activity.id);
                  return fetchRoutinesByActivity();
                }}
              >
                | See Routines Featuring This Activity
              </Link>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ActivitiesList;
