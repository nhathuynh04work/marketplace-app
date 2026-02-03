"use client";

import { useMutation } from "@tanstack/react-query";
import { loginAction, signupAction } from "@/app/actions/auth";
import { User } from "@/types/user";

interface LoginParams {
	email: string;
	password: string;
}

interface SignupParams {
	email: string;
	password: string;
}

export const useLogin = () => {
	return useMutation<{ user: User }, Error, LoginParams>({
		mutationFn: loginAction,
	});
};

export const useSignup = () => {
	return useMutation<{ user: User }, Error, SignupParams>({
		mutationFn: signupAction,
	});
};
