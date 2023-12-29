import Button from "@ui/Button";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { IoLogoApple } from "react-icons/io";
import { TextInput } from "@ui/Forms/Inputs";

import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useZodForm, Form } from "@ui/Forms/Form";

import showAlert from "@ui/Alert";
import Layout from "@/comps/Layout";
import AuthContainer from "@ui/Containers/AuthContainer";

import Link from "next/link";
import { useState } from "react";

import { useAppDispatch } from "@/hooks/useStoreTypes";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";
import { useRegisterMutation, useLoginMutation } from "@/api/auth";
import { setUser, setToken, setAuthenticated } from "@/state/slices/authSlice";

const schema = z
  .object({
    username: z.string().min(1),
    confirmPassword: z.string(),
    email: z.string().min(1).email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [login, loginResult] = useLoginMutation();
  const [register, result] = useRegisterMutation();
  const [rememberMe, setRememberMe] = useState(false);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const registerRes = await register({
        email: data.email,
        password: data.password,
        username: data.username,
        profile: {
          credit: 0,
          contact: "",
          address: "",
        },
      }).unwrap();

      if (registerRes.email && registerRes.username) {
        try {
          const loginRes = await login({
            username: data.username,
            password: data.password,
          }).unwrap();

          if (loginRes.access) {
            setLoading(true);
            dispatch(setAuthenticated(true));
            dispatch(setToken(loginRes.access));

            dispatch(
              setUser({
                email: registerRes.email,
                username: registerRes.username,
                refresh_token: loginRes.refresh,
              })
            );

            window.sessionStorage.setItem("access_token", loginRes.access);
            router.push("/");
          }
        } catch (err: any) {
          showAlert(
            err?.data?.message ?? "Something went wrong. Please try again.",
            "error"
          );
        }
      }
    } catch (err: any) {
      const errors = Object.keys(err?.data ?? {});
      showAlert(
        `${errors[0]} : ${err?.data[errors[0]]}` ??
          "Something went wrong. Please try again.",
        "error"
      );
    }
  };

  if (loading) return <StaticLoader />;

  return (
    <Layout>
      <AuthContainer authText="Sign up" maxWidth="xl">
        <Form form={form} onSubmit={onSubmit}>
          <div className="px-4 py-2 w-full">
            <TextInput
              label="Username"
              placeholder="username"
              {...form.register("username")}
            />
          </div>

          <div className="px-4 py-2 w-full">
            <TextInput
              label="Email"
              placeholder="john@doe.com"
              {...form.register("email")}
            />
          </div>

          <div className="px-4 py-2 w-full">
            <TextInput
              type="password"
              label="Password"
              placeholder="********"
              {...form.register("password")}
            />
          </div>

          <div className="px-4 py-2 w-full">
            <TextInput
              type="password"
              placeholder="********"
              label="Confirm Password"
              {...form.register("confirmPassword")}
            />
          </div>

          <div className="px-4 py-2 text-neutral-200 font-medium">
            Already have an account?{" "}
            <Link href={`/auth/login`} className="text-daisy-bush-300">
              Log in
            </Link>
          </div>

          <div className="px-4 py-2 w-full">
            <Button
              intent={`primary`}
              className="w-full relative font-bold"
              isLoading={
                result.isLoading ||
                loginResult.isLoading ||
                form.formState.isSubmitting
              }
            >
              Continue
            </Button>
          </div>

          {/* <div className="px-4 flex justify-center items-center w-full my-4">
            <span className="mx-4 text-daisy-bush-400 text-3xl font-bold">
              OR
            </span>
          </div> */}

          {/* <div className="px-4 py-2 w-full flex flex-col gap-y-4">
            <Button intent={`google`} className="w-full justify-start">
              <FcGoogle className="inline-block w-6 h-6" />
              <span className="ml-2">Continue with Google</span>
            </Button>
            <Button intent={`google`} className="w-full justify-start">
              <BsFacebook className="inline-block w-6 h-6" />
              <span className="ml-2">Continue with Facebook</span>
            </Button>
            <Button intent={`google`} className="w-full justify-start">
              <IoLogoApple className="inline-block w-8 h-8 -ml-1" />
              <span className="ml-2">Continue with Apple</span>
            </Button>
          </div> */}
        </Form>
      </AuthContainer>
    </Layout>
  );
}
