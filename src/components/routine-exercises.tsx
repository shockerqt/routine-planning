import { Suspense, use, type FC } from "react";
import { routineExerciseService } from "../controllers/local-storage";

interface Props {
  dayId: number;
}

const SuspenseRoutineEercises: FC<Props> = ({ dayId }) => {
  const exercises = use(routineExerciseService.getAll({ dayId }));

  return exercises.map((exercise) => (
    <div key={exercise.id}>
      <p>{exercise.name}</p>
    </div>
  ));
};

export const RoutineExercises: FC<Props> = (props) => {
  return (
    <Suspense>
      <SuspenseRoutineEercises {...props} />
    </Suspense>
  );
};
