"use client";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import FileUploader from "./FileUploader";
import { signOut } from "@/lib/actions/user.actions";

const MobileNav = ({
	avatar,
	ownerId,
	accountId,
	fullName,
	email,
}: {
	avatar: string;
	ownerId: string;
	accountId: string;
	fullName: string;
	email: string;
}) => {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	return (
		<header className='mobile-header'>
			<Image
				src='/cookiefull.png'
				alt='logo'
				width={120}
				height={50}
				className='h-auto'
			/>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger>
					<Image
						src='/assets/icons/menu.svg'
						alt='menu'
						width={24}
						height={24}
						className='w-6'
					/>
				</SheetTrigger>
				<SheetContent className='shad-sheet h-screen px-3'>
					<SheetTitle>
						<div className='header-user'>
							<Image
								src={avatar}
								alt='avatar'
								width={40}
								height={40}
								className='header-user-avatar'
							/>
							<div className='sm:hidden lg:block'>
								<p className='subtitle-2 capitalize'>{fullName}</p>
								<p className='caption'>{email}</p>
							</div>
						</div>
						<Separator className='my-4 bg-light-200/60' />
					</SheetTitle>
					<nav className='mobile-nav'>
						<ul className='mobile-nav-list'>
							{navItems.map(({ url, name, icon }) => (
								<Link key={name} href={url} className='lg:w-full'>
									<li
										className={cn(
											"mobile-nav-item",
											pathname === url && "shad-active"
										)}
									>
										<Image
											src={icon}
											alt={name}
											width={24}
											height={24}
											className={cn(
												"nav-icon",
												pathname === url && "nav-icon-active"
											)}
										/>
										<p className=''>{name}</p>
									</li>
								</Link>
							))}
						</ul>
					</nav>
					<Separator className='my-4 bg-light-200/60' />
					<div className='flex flex-col justify-between gap-5 pb-5'>
					<FileUploader />
						<Button type='submit' className='mobile-sign-out-button'onClick={async () => await signOut()}>
							<Image
								src='/assets/icons/logout.svg'
								alt='logout'
								width={24}
								height={24}
							
							/>
							<p>Wyloguj</p>
						</Button>
					</div>
				</SheetContent>
			</Sheet>
		</header>
	);
};

export default MobileNav;
