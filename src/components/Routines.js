import { useEffect, useState } from "react";
import { baseUrl } from "../App";
import RoutineList from "./RoutineList";

const Routines = (props) => {
  const {
    routines,
    setRoutines,
    user,
    routineId,
    setRoutineId,
    bigError,
    setBigError,
    setCreatorName,
    fetchRoutinesByUsername,
  } = props;
  const fetchRoutines = async () => {
    const response = await fetch(`${baseUrl}/routines`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return setRoutines([...data]);
  };
  useEffect(() => {
    fetchRoutines();
  }, []);
  return (
    <RoutineList
      routines={routines}
      user={user}
      routineId={routineId}
      setRoutineId={setRoutineId}
      bigError={bigError}
      setBigError={setBigError}
      setCreatorName={setCreatorName}
      fetchRoutinesByUsername={fetchRoutinesByUsername}
    />
  );
};

export default Routines;
