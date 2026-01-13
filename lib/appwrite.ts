import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import { Account, Avatars, Client, Databases, OAuthProvider, Query } from 'react-native-appwrite';


export const config = {

    platform: 'lk.riflan.qiera',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
    galleriesTableId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_TABLE_ID,
    reviewsTableId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_TABLE_ID,

    propertiesTableId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_TABLE_ID,

    agentsTableId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_TABLE_ID,


}

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)


export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function login() {
    try {

        const redirectUri = Linking.createURL('/');

        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);

        if (!response) throw new Error('Failed To Login')

        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        )

        if (browserResult.type != 'success') throw new Error('Failed To Login')

        const url = new URL(browserResult.url)

        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();

        if (!secret || !userId) throw new Error('Failed to Login')

        const session = await account.createSession(userId, secret)

        if (!session) throw new Error('Failed to Create a session')

        return true


    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function logout() {
    try {

        await account.deleteSession('current')
        return true
    } catch (error) {
        console.error(error)
        return false
    }


}
interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

export async function getCurrentUser(_: {} = {}): Promise<User | null> {
    try {
        const user = await account.get();
        return {
            $id: user.$id,
            name: user.name,
            email: user.email,
            avatar: user.name ? user.name[0] : '',
        };
    } catch (err) {
        return null;
    }
}

export async function getLatestProperties() {
    try {
        const result = await databases.listDocuments(
            config.databaseId!,
            config.propertiesTableId!,
            [Query.orderDesc('$createdAt'), Query.limit(5)]
        )

        return result.documents
    } catch (error) {
        console.error(error)
        return [];
    }
}

export async function getProperties({ filter, query, limit }: { filter: string; query: string; limit: number }) {

    try {

        const buildQuery = [Query.orderDesc('$createdAt')];

        if (filter && filter != 'All') {
            buildQuery.push(Query.equal('type', filter));
        } if (query) {
            buildQuery.push(
                Query.or(

                    [
                        Query.search('name', query),
                        Query.search('address', query),

                        Query.search('type', query),




                    ]
                )
            )
        }
        if (limit) buildQuery.push(Query.limit(limit));
          const result = await databases.listDocuments(
            config.databaseId!,
            config.propertiesTableId!,
            buildQuery,
        )

        return result.documents
    } catch (error) {
        console.error(error);
        return [];
    }

}

export async function getPropertyById({id} : {id:string}) {

    try {

        const result = await databases.getDocument(

            config.databaseId!,
            config.propertiesTableId!,
            
            id

        )

        return result
        
    } catch (error) {
        console.error(error)
        return null
    }
    
}
