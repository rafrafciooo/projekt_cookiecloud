"use client";

import { avatarPlaceholder, navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  fullName: string;
  email: string;
  avatar: string;
}




const Sidebar = ({ avatar, email, fullName }: Props) => {
	const pathname = usePathname();

	return (
		<aside className='sidebar'>
			<Link href='/'>
				<Image
					src='/cookiefull.png'
					alt='logo'
					width={160}
					height={60}
					className='h-auto lg:block'
				/>

				{/* <Image
					src='/cookiefull.png'
					alt='logo'
					width={260}
					height={200}
					className=' lg:hidden'
				/> */}
			</Link>

			<nav className='sidebar-nav'>
				<ul className='flex flex-col flex-1 gap-6 '>
					{navItems.map(({ url, name, icon }) => (
						<Link key={name} href={url} className='lg:w-full'>
							<li
								className={cn(
									"sidebar-nav-item",
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
								<p className='hidden lg:block'>{name}</p>
							</li>
						</Link>
					))}
				</ul>
			</nav>

			<Image
				src='/assets/images/files-2.png'
				alt='file'
				width={300}
				height={150}
				className='mt-10'
			/>

			<div className='sidebar-user-info'>
				<Image
					src={avatar}
					alt='avatar'
					width={40}
					height={40}
					className='sidebar-user-avatar'
				/>
				<div className='hidden lg:block '>
					<p className='subtitle-2 capitalize'>{fullName}</p>
					<p className='caption'>{email}</p>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
