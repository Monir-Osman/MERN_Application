import { createContext, useReducer, useState } from "react";
import { workoutReducer } from "../reducers/reducer";

export const WorkoutContext = createContext();

// eslint-disable-next-line react/prop-types
export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: null,
  });
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [id, setId] = useState(null);

  return (
    <WorkoutContext.Provider
      value={{
        ...state,
        dispatch,
        title,
        setTitle,
        load,
        setLoad,
        reps,
        setReps,
        isUpdating,
        setIsUpdating,
        id,
        setId,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
