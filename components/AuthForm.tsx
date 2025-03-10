"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { createAccount, signIn } from "@/lib/actions/user.actions";
import OTPModal from "./OTPModal";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
	return z.object({
		email:
			formType === "sign-up"
				? z
						.string()
						.min(5, { message: "Email jest wymagany" })
						.email({ message: "Niepoprawny format email" })
				: z.string().email({ message: "Niepoprawny format email" }),
		fullName:
			formType === "sign-up"
				? z.string().min(2, {
						message: "Imie jest wymagane",
				  })
				: z.string().optional(),
	});
};

const AuthForm = ({ type }: { type: FormType }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [accountId, setAccountId] = useState<string>("");

	const formSchema = authFormSchema(type);
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: "",
			email: "",
		},
	});

	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		setErrorMessage("");
		try {
			const user =
				type === "sign-up"
					? await createAccount({
							fullName: values.fullName || "",
							email: values.email,
					  })
					: await signIn({ email: values.email });
if (!user.success) {
	setErrorMessage(user.error);
	return
} 
			setAccountId(user.accountId);
		} catch (error) {
			setErrorMessage("Wystąpił błąd podczas tworzenia konta");
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='auth-form'>
					<h1 className='form-title'>
						{type === "sign-in" ? "Zaloguj się" : "Zarejestruj się"}
					</h1>
					{type === "sign-up" && (
						<FormField
							control={form.control}
							name='fullName'
							render={({ field }) => (
								<FormItem>
									<div className='shad-form-item'>
										<FormLabel className='shad-form-label'>Imię</FormLabel>
										<FormControl>
											<Input
												className='shad-input'
												placeholder='jak sie nazywasz? :)'
												{...field}
											/>
										</FormControl>
									</div>

									<FormMessage className='shad-form-message' />
								</FormItem>
							)}
						/>
					)}
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<div className='shad-form-item'>
									<FormLabel className='shad-form-label'>Email</FormLabel>
									<FormControl>
										<Input
											className='shad-input'
											placeholder='Email'
											{...field}
										/>
									</FormControl>
								</div>

								<FormMessage className='shad-form-message' />
							</FormItem>
						)}
					/>
					<Button
						type='submit'
						className='form-submit-button'
						disabled={isLoading}
					>
						{type === "sign-in" ? "Zaloguj się" : "Zarejestruj się"}
						{isLoading && (
							<Image
								src='/assets/icons/loader.png'
								alt='loader'
								width={30}
								height={20}
								className='ml-2 animate-spin'
							/>
						)}
					</Button>
					{errorMessage && <p className='error-message'>{errorMessage}</p>}

					<div className='body-2 flex justify-center'>
						<p className='text-gray-400'>
							{type === "sign-in" ? "Nie masz konta?" : "Masz juz konto?"}
						</p>
						<Link
							href={type === "sign-in" ? "/sign-up" : "/sign-in"}
							className='ml-1 font-medium text-brand'
						>
							{type === "sign-in" ? "Zarejestruj się" : "Zaloguj się"}
						</Link>
					</div>
				</form>
			</Form>
			{accountId && (
				<OTPModal email={form.getValues("email")} accountId={accountId} />
			)}
		</>
	);
};

export default AuthForm;
