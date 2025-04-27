import { type FormEventHandler } from "react";

export const RoutineDayCreateForm = () => {
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" />
      </form>
    </div>
  );
};
