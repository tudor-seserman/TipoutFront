import { ActionMeta, GroupBase, OnChangeValue } from "react-select";
import { Option } from "./Option";

export type SelectProps = {
  label: JSX.Element;
  value: Option | undefined;
  disabled: boolean;
  submitting: boolean;
  options: readonly (Option | GroupBase<Option>)[];
  handleChange: (newValue: OnChangeValue<Option, false>, actionMeta: ActionMeta<Option>) => void
};
