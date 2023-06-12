import { FormEvent, useState } from "react";

export const useUserInfo = (defaultState: any) => {
  const [name, setName] = useState(defaultState.name);
  const [email, setEmail] = useState(defaultState.email);

  const changeHandler = (
    e: FormEvent<HTMLInputElement>,
    field: "name" | "email"
  ) => {
    if (field == "name") {
      setName(e.currentTarget.value);
    }
    if (field == "email") {
      setEmail(e.currentTarget.value);
    }
  };

  return { name, email, changeHandler };
};
