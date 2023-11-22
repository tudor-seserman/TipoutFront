import { ActionMeta } from "react-select";

export type SelectProps = {
  submitting: boolean;
  options: readonly unknown[];
  handleChange: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
};
