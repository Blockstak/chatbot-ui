import { ComponentProps } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useForm,
  UseFormProps,
  FormProvider,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
import { ZodSchema, TypeOf } from "zod";

interface UseZodFormProps<T extends ZodSchema<any>>
  extends UseFormProps<TypeOf<T>> {
  schema: T;
}

export const useZodForm = <T extends ZodSchema<any>>(
  props: UseZodFormProps<T>
): UseFormReturn<TypeOf<T>> => {
  const { schema, ...rest } = props;

  return useForm<TypeOf<T>>({
    ...rest,
    resolver: zodResolver(schema),
  });
};

export interface FieldErrorProps {
  name?: string;
}

export const FieldError = ({ name }: FieldErrorProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  if (!name) return null;

  const error = errors[name];

  if (!error) return null;

  return (
    <div className="text-xs md:text-sm text-red-400">
      <p>{error.message as string}</p>
    </div>
  );
};

export interface FormProps<T extends FieldValues = any>
  extends Omit<ComponentProps<"form">, "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

export const Form = <T extends FieldValues = any>({
  form,
  onSubmit,
  children,
  ...rest
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...rest}>
        {children}
      </form>
    </FormProvider>
  );
};
