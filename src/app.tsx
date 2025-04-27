import { RoutineDayCreateForm } from "./components/routine-day-create-form";
import { Routine } from "./routine";

export const App = () => {
  return (
    <div>
      <RoutineDayCreateForm />

      <Routine />
    </div>
  );
};
