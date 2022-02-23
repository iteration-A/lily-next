import { ChangeEventHandler, useState } from "react";

type useInput = () => [string, any, any]
const useInput: useInput = (defaultValue = "") => {
  const [value, setValue] = useState(defaultValue);

  const updateValue: ChangeEventHandler<HTMLInputElement> = (e) =>
    setValue(e.target.value);

	const clearValue = () => setValue("")
  return [value, updateValue, clearValue];
};

export default useInput;
