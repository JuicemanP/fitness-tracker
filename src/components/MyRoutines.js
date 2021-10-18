import { useEffect } from "react";
import { baseUrl } from "../App";
import RoutineList from "./RoutineList";

const MyRoutines = (props) => {
  const {
    user,
    routines,
    setRoutines,
    bigError,
    setBigError,
    fetchMyRoutines,
  } = props;

  useEffect(() => {
    if (user) {
      fetchMyRoutines();
    }
  }, []);

  return (
    <>
      <RoutineList routines={routines} user={user} />
      <h3>{bigError}</h3>
    </>
  );
};

export default MyRoutines;
