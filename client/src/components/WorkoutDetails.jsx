import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import moment from "moment";

/* eslint-disable react/prop-types */
function WorkoutDetails({ workout }) {
  const { dispatch, setTitle, setReps, setLoad, setIsUpdating, setId } =
    useWorkoutsContext();

  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) return;
    const response = await fetch(
      `http://localhost:3000/api/workouts/${workout._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const handlePrepareForUpdate = async () => {
    const response = await fetch(
      `http://localhost:3000/api/workouts/${workout._id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      setTitle(data.title);
      setLoad(data.load);
      setReps(data.reps);
      setId(workout._id);
      setIsUpdating(true);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg):</strong> {workout.load}
      </p>
      <p>
        <strong>Reps:</strong> {workout.reps}
      </p>
      <p>{moment(workout.createdAt).fromNow()}</p>

      <span
        className="material-symbols-outlined update"
        onClick={handlePrepareForUpdate}
      >
        Edit
      </span>
      <span className="material-symbols-outlined delete" onClick={handleDelete}>
        Delete
      </span>
    </div>
  );
}

export default WorkoutDetails;
