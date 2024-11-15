import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { createUserAccount, signInAccount } from '../appwrite/api';
import { INewUser } from '@/types';

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    });
    
}

export const useSignInAccount = () => {
    return useMutation<unknown, Error, { email: string; password: string; }>({
        mutationFn: (user: { email: string; password: string; }) => signInAccount(user)
    });
}


// import { useMutation } from '@tanstack/react-query';
// import { createUserAccount, signInAccount } from '../appwrite/api';
// import { INewUser } from '@/types';

// export const useCreateUserAccount = () => {
//     const mutation = useMutation({
//         mutationFn: (user: INewUser) => createUserAccount(user),
//     });
//     return {
//         ...mutation,
//         isLoading: mutation.isLoading,  // Explicitly return isLoading
//     };
// };

// export const useSignInAccount = () => {
//     const mutation = useMutation({
//         mutationFn: (user: { email: string; password: string }) => signInAccount(user),
//     });
//     return {
//         ...mutation,
//         isLoading: mutation.isLoading,  // Explicitly return isLoading
//     };
// };
