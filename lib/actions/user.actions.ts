"use server";

import { Account, ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { avatarPlaceholder } from "@/constants";
import { redirect } from "next/navigation";
import { error } from "console";

const getUserByEmail = async (email: string) => {
	const { databases } = await createAdminClient();

	const result = await databases.listDocuments(
		appwriteConfig.databaseId,
		appwriteConfig.usersCollectionId,
		[Query.equal("email", [email])]
	);

	return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
	console.log(error, message);
	throw error;
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
	const { account } = await createAdminClient();

	try {
		const session = await account.createEmailToken(ID.unique(), email);
		return session.userId;
	} catch (error) {
		handleError(error, "Błąd przy wysłaniu OTP");
	}
};

export const createAccount = async ({
	fullName,
	email,
}: {
	fullName: string;
	email: string;
}) => {
	const existingUser = await getUserByEmail(email);
	const accountId = await sendEmailOTP({ email });
	if (!accountId) throw new Error("Błąd przy tworzeniu konta");
	if (!existingUser) {
		const { databases } = await createAdminClient();
		await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.usersCollectionId,
			ID.unique(),
			{
				email,
				fullName,
				avatar: avatarPlaceholder,

				accountId,
			}
		);
	}

	return parseStringify({ accountId });
};

export const verifySecret = async ({
	accountId,
	password,
}: {
	accountId: string;
	password: string;
}) => {
	try {
		const { account } = await createAdminClient();
		const session = await account.createSession(accountId, password);
		(await cookies()).set("appwrite-session", session.secret, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: true,
		});

		return parseStringify({ sessionId: session.$id });
	} catch (error) {
		handleError(error, "Błąd przy weryfikacji OTP");
	}
};

export const getCurrentUser = async () => {
	const { account, databases } = await createSessionClient();
	const result = await account.get();
	const user = await databases.listDocuments(
		appwriteConfig.databaseId,
		appwriteConfig.usersCollectionId,
		[Query.equal("accountId", result.$id)]
	);

	if (user.total <= 0) return null;

	return parseStringify(user.documents[0]);
};

export const signOut = async () => {
	const { account } = await createSessionClient();

	try {
		await account.deleteSession("current");
		(await cookies()).delete("appwrite-session");
	} catch (error) {
		handleError(error, "Błąd przy wylogowywaniu");
	} finally {
		redirect("/sign-in");
	}
};

export const signIn = async ({ email }: { email: string }) => {
	try {
		const existingUser = await getUserByEmail(email);
		if (!existingUser) {
			return {
				success: false,
				error: "Niepoprawny adres e-mail. Spróbuj ponownie.",
			};
		}

		await sendEmailOTP({ email });
		return { success: true, accountId: existingUser.accountId };
	} catch (error) {
		return { success: false, error: "Wystąpił błąd. Spróbuj ponownie." };
	}
};
