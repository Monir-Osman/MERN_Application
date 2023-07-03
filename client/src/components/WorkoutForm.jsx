import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

function WorkoutForm() {
  const { user } = useAuthContext();
  const {
    dispatch,
    title,
    load,
    reps,
    setTitle,
    setLoad,
    setReps,
    isUpdating,
    setIsUpdating,
    id,
  } = useWorkoutsContext();

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { title, load, reps };

    const response = await fetch("http://localhost:3000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("New workout Added", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  const handleUpdate = async () => {
    const workout = { title, load, reps };

    const response = await fetch(`http://localhost:3000/api/workouts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(workout),
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setIsUpdating(false);
    }
  };

  return (
    <form className="create">
      <h3>Add a New Workout</h3>
      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
        required
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
        required
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
        required
      />

      {!isUpdating ? (
        <button onClick={handleSubmit}>Add Workout</button>
      ) : (
        <button onClick={handleUpdate}>Update Workout</button>
      )}

      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
