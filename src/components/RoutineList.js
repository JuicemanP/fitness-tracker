import { Link } from "react-router-dom";

const RoutineList = (props) => {
  const {
    routines,
    user,
    routineId,
    setRoutineId,
    bigError,
    setBigError,
    setCreatorName,
    fetchRoutinesByUsername,
  } = props;
  return (
    <div>
      {routines.map((routine) => {
        return (
          <>
            <h3>
              <strong>Name:</strong>
              {routine.name}
            </h3>
            <p>
              <strong>Goal:</strong>
              {routine.goal}
            </p>
            <Link
              to="/routinesByUser"
              onClick={() => {
                fetchRoutinesByUsername();
                setCreatorName(routine.creatorName);
              }}
            >
              <p>
                <strong>Created By:</strong>
                {routine.creatorName}
              </p>
            </Link>
            {user && user.id == routine.creatorId && (
              <p>
                <Link
                  to="/routineEditor"
                  onClick={() => {
                    setRoutineId(routine.id);
                  }}
                >
                  Edit This Routine
                </Link>
              </p>
            )}
            {routines.length < 1 && <p>No Routines Found</p>}
          </>
        );
      })}
    </div>
  );
};

export default RoutineList;
