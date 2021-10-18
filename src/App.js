import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { Route } from "react-router";
import MyRoutines from "./components/MyRoutines";
import Routines from "./components/Routines";
import Activities from "./components/Activities";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ActivityEditor from "./components/ActivityEditor";
import RoutineEditor from "./components/RoutineEditor";
import RoutineList from "./components/RoutineList";

export const baseUrl = "https://fitnesstrac-kr.herokuapp.com/api";

const App = () => {
  const [user, setUser] = useState(null);
  const [activityId, setActivityId] = useState(null);
  const [activities, setActivities] = useState([]);
  const [pairedActivities, setPairedActivities] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [routineId, setRoutineId] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [bigError, setBigError] = useState("");
  const [creatorName, setCreatorName] = useState("");

  const fetchActivities = async () => {
    const response = await fetch(`${baseUrl}/activities`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return setActivities([...data]);
  };

  const fetchRoutinesByActivity = async () => {
    const response = await fetch(
      `${baseUrl}/activities/${activityId}/routines`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.length > 1) {
      return setRoutines([...data]);
    }
  };

  const fetchMyRoutines = async () => {
    setRoutines([]);
    setBigError("");
    const response = await fetch(`${baseUrl}/users/${user.username}/routines`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();
    if (data.length > 1) {
      return setRoutines([...data]);
    } else {
      setBigError("No Routines Found!");
      return setRoutines([]);
    }
  };

  const fetchRoutinesByUsername = async () => {
    const response = await fetch(`${baseUrl}/users/${creatorName}/routines`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return setRoutines([...data]);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return setUser(null);
    }
    const fetchUser = async () => {
      const response = await fetch(`${baseUrl}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser({ id: data.id, username: data.username, token: token });
    };
    fetchUser();
  }, []);
  return (
    <>
      <Navbar
        setUser={setUser}
        user={user}
        fetchMyRoutines={fetchMyRoutines}
        fetchActivities={fetchActivities}
      />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/my-routines">
        <MyRoutines
          user={user}
          routines={routines}
          setRoutines={setRoutines}
          bigError={bigError}
          setBigError={setBigError}
          fetchMyRoutines={fetchMyRoutines}
        />
      </Route>
      <Route path="/routines">
        <Routines
          routines={routines}
          setRoutines={setRoutines}
          user={user}
          routineId={routineId}
          setRoutineId={setRoutineId}
          bigError={bigError}
          setBigError={setBigError}
          setCreatorName={setCreatorName}
          fetchRoutinesByUsername={fetchRoutinesByUsername}
        />
      </Route>
      <Route path="/routinesByActivity">
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
      </Route>
      <Route path="/routinesByUser">
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
      </Route>
      <Route path="/routineEditor">
        <RoutineEditor routineId={routineId} setRoutineId={setRoutineId} />
      </Route>
      <Route exact path="/activities">
        <Activities
          activityId={activityId}
          setActivityId={setActivityId}
          user={user}
          fetchActivities={fetchActivities}
          activities={activities}
          fetchRoutinesByActivity={fetchRoutinesByActivity}
        />
      </Route>
      <Route path="/activities/edit">
        <ActivityEditor
          activityId={activityId}
          setActivityId={setActivityId}
          user={user}
          fetchActivities={fetchActivities}
        />
      </Route>
      <Route path="/login">
        <Login setUser={setUser} />
      </Route>
      <Route path="/register">
        <Register setUser={setUser} />
      </Route>
    </>
  );
};

export default App;
