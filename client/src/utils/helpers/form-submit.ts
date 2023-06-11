import { FormEvent } from "react";
import { IFormProps, loginDto, registerDto } from "../interfaces";
import { AxiosResponse } from "axios";
import { UseMutationResult } from "@tanstack/react-query";

type TMutation = UseMutationResult<
  AxiosResponse<any, any> | undefined,
  unknown,
  registerDto | loginDto,
  unknown
>;

export const formSubmitHandler = <T extends registerDto | loginDto>(
  e: FormEvent<HTMLFormElement>,
  mutation: TMutation,
  error: Error | null
) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const fields = Object.fromEntries(formData);

  mutation.mutate(fields as T);
  error || e.currentTarget.reset();
};
