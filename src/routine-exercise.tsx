import { type FC } from "react";

interface Props {
  id: number;
}

export const RoutineExercise: FC<RoutineExerciseProps> = (props) => {
  const exercise = useExercise(props.id);
  return <div>{props}</div>;
};

type Exercise = {
  id: number;
};

export const useExercise = (id: number) => {
  const update = () => {};

  return {
    exercise: null,
    update,
  };
};
