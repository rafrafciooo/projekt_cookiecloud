import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex min-h-screen'>
			<section className='bg-brand p-10 hidden w-1/2 items-center justify-center lg:flex xl:w-2/5'>
				<div className='flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12'>
					<Image
						src='/bgcookie.png'
						alt='cookiecloud'
						width={224}
						height={82}
						className='h-auto'
					/>
					<div className='space-y-5 text-white'>
						<h1 className='h1'>Przechowuj i zarządzaj plikami</h1>
						<p className='body-1'>Wszystko co potrzebujesz w jednym miejscu</p>
					</div>
					<Image
						src='/assets/images/files.png'
						alt='file'
						width={342}
						height={342}
						className='transition-all hover:scale-105 hover:rotate-3 duration-500'
					/>
				</div>
			</section>
			<section
				className='flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0
'
			>
				<div className='mb-16 lg:hidden'>
					<Image
						src='/bgcookie.png'
						alt='cookiecloud'
						width={224}
						height={82}
						className='h-auto w-[200px] lg:[250px]'
					/>
				</div>

				{children}
			</section>
		</div>
	);
};

export default Layout;
