import jwt from "jsonwebtoken";
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

import { useSignupMutation } from "@/api/auth";
import { useAppDispatch } from "@/hooks/useStoreTypes";
import { setUser, setToken } from "@/state/slices/authSlice";

const schema = z.object({
  email: z.string().min(1).email("Please enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [signup, result] = useSignupMutation();
  const [rememberMe, setRememberMe] = useState(false);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await signup({
        email: data.email,
      }).unwrap();

      if (res.token) {
        dispatch(setToken(res.token));
        window.sessionStorage.setItem("token", res.token);
        const decoded = jwt.decode(res.token) as JwtPayload | null;

        if (decoded) {
          dispatch(
            setUser({
              username: decoded.sub,
              user_type: decoded.user_type,
            })
          );
        }
        router.push("/accounts");
      }
    } catch (err: any) {
      showAlert(
        err?.data?.message ?? "Something went wrong. Please try again.",
        "error"
      );
    }
  };

  return (
    <Layout>
      <AuthContainer authText="Sign up" maxWidth="xl">
        <Form form={form} onSubmit={onSubmit}>
          <div className="px-4 py-2 w-full">
            <div className="relative">
              <TextInput
                label="Email"
                placeholder="john@doe.com"
                {...form.register("email")}
              />
            </div>
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
              isLoading={result.isLoading}
            >
              Continue
            </Button>
          </div>

          <div className="px-4 flex justify-center items-center w-full my-4">
            <span className="mx-4 text-daisy-bush-400 text-3xl font-bold">
              OR
            </span>
          </div>

          <div className="px-4 py-2 w-full flex flex-col gap-y-4">
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
          </div>
        </Form>
      </AuthContainer>
    </Layout>
  );
}
