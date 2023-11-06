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

import { HiCheck } from "react-icons/hi";
import { useLoginMutation } from "@/api/auth";
import { setUser, setToken } from "@/state/slices/authSlice";
import * as CheckBox from "@radix-ui/react-checkbox";
import { useAppDispatch } from "@/hooks/useStoreTypes";

const schema = z.object({
  email: z.string().min(1).email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(256, "Password must be less than 256 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, result] = useLoginMutation();
  const [rememberMe, setRememberMe] = useState(false);

  const form = useZodForm({
    schema: schema,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
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
      <AuthContainer authText="Login" maxWidth="xl">
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

          <div className="px-4 py-2 w-full">
            <div className="relative">
              <TextInput
                type="password"
                label="Password"
                {...form.register("password")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-x-6 md:flex-row items-center justify-between px-4 py-2 w-full text-neutral-200 mb-2">
            <div className="flex items-center mb-2 md:mb-0">
              <CheckBox.Root
                className="mr-1 flex h-4 w-4 appearance-none items-center justify-center rounded-sm bg-white data-[state=checked]:bg-daisy-bush-400 outline-none data-[state=unchecked]:border border-gray-300"
                checked={rememberMe}
                onCheckedChange={() => setRememberMe(!rememberMe)}
              >
                <CheckBox.Indicator className="text-neutral-900">
                  <HiCheck className="w-4 h-4" />
                </CheckBox.Indicator>
              </CheckBox.Root>
              <label className="text-sm">Remember Me</label>
            </div>

            <span className="inline-block text-daisy-bush-300 text-sm font-semibold cursor-pointer">
              <Link href={`/forgot-password`}>Forgot password?</Link>
            </span>
          </div>

          <div className="px-4 py-2 text-neutral-200 font-medium">
            Not registered yet?{" "}
            <Link href={`/auth/signup`} className="text-daisy-bush-300">
              {" "}
              Sign-up now
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
              <span className="ml-2">Sign In with Google</span>
            </Button>
            <Button intent={`google`} className="w-full justify-start">
              <BsFacebook className="inline-block w-6 h-6" />
              <span className="ml-2">Sign In with Facebook</span>
            </Button>
            <Button intent={`google`} className="w-full justify-start">
              <IoLogoApple className="inline-block w-8 h-8 -ml-1" />
              <span className="ml-2">Sign In with Apple</span>
            </Button>
          </div>
        </Form>
      </AuthContainer>
    </Layout>
  );
}
