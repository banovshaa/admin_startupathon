"use client";

import { AxiosError } from "axios";
import { useContext, useRef } from "react";
import { LoaderContext } from "@/components/providers/LoaderProvider";
import Button from "@/components/shared/Button/Button";
import Input from "@/components/shared/Input/Input";
import { formDataCreate } from "@/libs/form";
import {
  checkUserRequest,
  registerRequest,
} from "@/services/auth/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import React, { FormEvent } from "react";
import "@/assets/css/auth.scss";

const Register = () => {
  const router = useRouter();
  const { setLoading } = useContext(LoaderContext);

  const inputRefs = {
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };

  const checkUser = async () => {
    const formData = formDataCreate([
      {
        name: "email",
        value: inputRefs.email.current?.value || "",
      },
    ]);
    try {
      const { data } = await checkUserRequest(formData);
      return data.user;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred.");
      } else {
        toast.error("An unexpected error occurred.");
      }
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const emailExists = await checkUser();
    if (emailExists) {
      toast.error("This user already exists");
      setLoading(false);
      return;
    }

    const formData = formDataCreate([
      {
        name: "firstName",
        value: inputRefs.firstName.current?.value || "",
      },
      {
        name: "lastName",
        value: inputRefs.lastName.current?.value || "",
      },
      {
        name: "email",
        value: inputRefs.email.current?.value || "",
      },
      {
        name: "password",
        value: inputRefs.password.current?.value || "",
      },
    ]);

    try {
      const { status } = await registerRequest(formData);

      if (status === 200) {
        router.push("/auth/login");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Registration failed.");
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
          <h2 className="title">Register</h2>
          <form onSubmit={handleSubmit}>
            <Input
              name="First name"
              placeholder="Enter your first name"
              required
              inputRef={inputRefs.firstName}
            />
            <Input
              name="Last name"
              placeholder="Enter your last name"
              required
              inputRef={inputRefs.lastName}
            />
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
            {/* <Input
              name="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              required
            /> */}
            <Button name="Sign Up" style={{ width: "100%" }} />
          </form>

          <p className="signup__link">
            Already have an account? <Link href="/auth/login">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
