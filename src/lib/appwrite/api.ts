import { account, appwriteConfig, avatars, databases } from './config';
import { INewUser } from './../../types/index';
import { ID, Query } from "appwrite";

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: new URL(avatarUrl),
        });

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            user,
        )
        console.log(newUser);
        
        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export async function signInAccount(user: { email: string; password: string; }) {
    try {
        const session = await account.createSession(user.email, user.password);
        if (session) {
            console.log("Session created:", session);
        }

        return session;
    } catch (error) {
        console.log(error)
    }
}



export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) return null; 

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        return currentUser.documents[0] || null;
    } catch (error) {
        console.log("Error fetching current user:", error);
        return null;  // Return null to indicate no user found
    }
}


export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        console.log(error)
    }
}