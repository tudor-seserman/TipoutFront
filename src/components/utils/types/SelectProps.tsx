import { ActionMeta } from "react-select";

export type SelectProps = {
  disabled: boolean;
  submitting: boolean;
  options: readonly unknown[];
  handleChange: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
};
