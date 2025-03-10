"use client";

import "@/assets/css/auth.scss";
import { LoaderContext } from "@/components/providers/LoaderProvider";
import { UserContext } from "@/components/providers/UserProvider";

import Button from "@/components/shared/Button/Button";
import Input from "@/components/shared/Input/Input";
import { setCookie } from "@/libs/cookies";
import { formDataCreate } from "@/libs/form";
import { loginRequest } from "@/services/auth/auth.service";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useContext, useRef } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const { setLoading } = useContext(LoaderContext);

  const router = useRouter();
  const inputRefs = {
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = formDataCreate([
        {
          name: "email",
          value: inputRefs.email.current?.value || "",
        },
        {
          name: "password",
          value: inputRefs.password.current?.value || "",
        },
      ]);

      const { data, status } = await loginRequest(formData);
      if (status === 200) {
        setUser(data.user);
        setCookie("usertoken", data.token, 365);
        router.push("/");
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth__container">
        <div className="login__box">
          <h2 className="title">Login</h2>
          <form onSubmit={handleSubmit}>
            <Input
              name="Email"
              type="email"
              placeholder="Enter your email"
              required
              inputRef={inputRefs.email}
            />
            <Input
              name="Password"
              type="password"
              placeholder="Enter your password"
              required
              inputRef={inputRefs.password}
            />
            <Button name="Login" style={{ width: "100%" }} />
            {/* <div className="forgot__password">
              <Link href="#">Forgot Password?</Link>
            </div> */}
          </form>

          <p className="signup__link">
            Do not have an account?{" "}
            <Link href="/auth/register">Sign up here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
