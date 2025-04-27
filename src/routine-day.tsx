import { Suspense, use, type FC } from "react";
import { routineDayService } from "./controllers/local-storage";
import { RoutineExercises } from "./components/routine-exercises";

type RoutineDayProps = {
  id: number;
};

const SuspenseComponent: FC<RoutineDayProps> = ({ id }) => {
  const day = use(routineDayService.getOne({ id }));

  return (
    <div>
      <h2>{day.name}</h2>
      <RoutineExercises dayId={day.id} />
    </div>
  );
};

export const RoutineDay: FC<RoutineDayProps> = (props) => {
  return (
    <Suspense>
      <SuspenseComponent {...props} />
    </Suspense>
  );
};
