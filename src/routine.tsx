import { Suspense, use, type FC } from "react";
import { RoutineDay } from "./routine-day";
import { routineDayService } from "./controllers/local-storage";

const SuspenseComponent: FC = () => {
  const days = use(routineDayService.getAll());

  return days.map((day) => (
    <div key={day.id}>
      <RoutineDay id={day.id} />
    </div>
  ));
};

export const Routine = () => {
  return (
    <Suspense>
      <p>Routina</p>
      <SuspenseComponent />
    </Suspense>
  );
};
