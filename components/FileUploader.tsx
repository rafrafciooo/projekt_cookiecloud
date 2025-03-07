"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import Thumbnail from "./Thumbnail";

interface Props {
	ownerId: string;
	accountId: string;
	className?: string;
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {
	const [files, setFiles] = useState<File[]>([]);
	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const handleRemoveFile = (e: React.MouseEvent, fileName: string) => {
		// ten sposob gorszy , ale dziala
				// e.preventDefault();
		// const updatedFiles = files.filter(file => file.name !== fileName);
		// setFiles(updatedFiles);


		e.stopPropagation();
		setFiles((prevFiles) => prevFiles.filter((file) => 
			file.name !== fileName));
	};

	return (
		<div className='cursor-pointer' {...getRootProps()}>
			<input {...getInputProps()} />
			<Button type='button' className={cn("uploader-button", className)}>
				<Image
					src='/assets/icons/upload.svg'
					alt='upload'
					width={24}
					height={24}
				/>
				<p>Dodaj pliki</p>
			</Button>
			{files.length > 0 && (
				<ul className='uploader-preview-list'>
					<h4 className='h4 text-dark-100'>Dodane pliki</h4>
					{files.map((file, index) => {
						const { type, extension } = getFileType(file.name);
						return (
							<li
								key={`${file.name}-${index}`}
								className='uploader-preview-item'
							>
								<div className='flex items-center gap-3'>
									<Thumbnail
										type={type}
										extension={extension}
										url={convertFileToUrl(file)}
									/>
									<div className='preview-item-name'>
										{file.name}
										<Image
											src='/assets/icons/file-loader.gif'
											alt='delete'
											width={24}
											height={24}
											className='w-20'
										/>
									</div>
								</div>
								<Image
									src='/assets/icons/remove.svg'
									alt='remove'
									width={24}
									height={24}
									onClick={e => handleRemoveFile(e, file.name)} // delete file
								/>
							</li>
						);
					})}
				</ul>
			)}

			{isDragActive ? (
				<p>Drop the files here ...</p>
			) : (
				<p>Drag 'n' drop some files here, or click to select files</p>
			)}
		</div>
	);
};

export default FileUploader;

