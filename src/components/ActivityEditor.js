import { useState } from "react";
import { useHistory } from "react-router";
import { baseUrl } from "../App";

const ActivityEditor = (props) => {
  const { activityId, setActivityId, user, fetchActivities } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const updateActivity = async () => {
    if (name && description) {
      const response = await fetch(`${baseUrl}/activities/${activityId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
        }),
      });
      const data = await response.json();
      setActivityId(null);
      console.log(data);
      return data;
    } else if (name) {
      await fetch(`${baseUrl}/activities/${activityId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name: name,
        }),
      });
      setActivityId(null);
      return;
    } else if (description) {
      await fetch(`${baseUrl}/activities/${activityId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          description: description,
        }),
      });
      setActivityId(null);
      return;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateActivity();
    fetchActivities();
    history.push("/activities");
  };
  return (
    <>
      <h3>Update this activity:</h3>
      <form onSubmit={handleSubmit}>
        <span>Name:</span>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <span>Description:</span>
        <input
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <button>Submit</button>
      </form>
    </>
  );
};

export default ActivityEditor;
