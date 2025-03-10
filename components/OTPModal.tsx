"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	InputOTP,
	InputOTPGroup,

	InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { sendEmailOTP, verifySecret } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const OTPModal = ({
	accountId,
	email,
}: {
	accountId: string;
	email: string;
}) => {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(true);
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

    // OTP weryfikacja przez api
	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const sessionId = await verifySecret({ accountId, password });

			if (sessionId) router.push("/");
		} catch (error) {
			console.log("error", error);
		}

		setIsLoading(false);
	};
    
    // wyslij ponownie otp
	const handleResendOtp = async () => {

await sendEmailOTP({ email });




	};

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogContent className='shad-alert-dialog'>
				<AlertDialogHeader className='relative flex justify-center'>
					<AlertDialogTitle className='h2 text-center'>
						Wpisz kod weryfikacyjny
						<Image
							src='/assets/icons/close-dark.svg'
							alt='close'
							width={24}
							height={24}
							className='otp-close-button'
							onClick={() => setIsOpen(false)}
						/>
					</AlertDialogTitle>
					<AlertDialogDescription className='subtitle-2 text-center text-gray-400'>
						Wysłaliśmy kod weryfikacyjny na{" "}
						<span className='pl-1 text-brand'>{email}</span>.
						<br />
						Sprawdź skrzynke pocztową i wprowadź go poniżej
					</AlertDialogDescription>
				</AlertDialogHeader>
				<InputOTP maxLength={6} value={password} onChange={setPassword}>
					<InputOTPGroup className='shad-otp'>
						<InputOTPSlot index={0} className='shad-otp-slot' />
						<InputOTPSlot index={1} className='shad-otp-slot' />
						<InputOTPSlot index={2} className='shad-otp-slot' />
						<InputOTPSlot index={3} className='shad-otp-slot' />
						<InputOTPSlot index={4} className='shad-otp-slot' />
						<InputOTPSlot index={5} className='shad-otp-slot' />
					</InputOTPGroup>
				</InputOTP>

				<AlertDialogFooter>
					<div className='flex w-full flex-col gap-4 '>
						<AlertDialogAction
							onClick={handleSubmit}
							className='shad-submit-btn h-12'
							type='button'
						>
							Continue
							{isLoading && (
								<Image
									src='/assets/icons/loader.png'
									alt='loader'
									width={30}
									height={30}
									className='ml-2 animate-spin'
								/>
							)}
						</AlertDialogAction>
						<div className='subtitle-2 mt-2 text-center text-zinc-400'>
							Nie otrzymałeś kodu?
							<Button
								onClick={handleResendOtp}
								variant='link'
								className='text-brand pl-1'
							>
								wyślij kod ponownie
							</Button>
						</div>
					</div>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default OTPModal;
