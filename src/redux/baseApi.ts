
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getStorageToken } from '../utils';

// Define the types for login credentials and other responses
interface LoginCredentials {
  username: string;
  password: string;
  email: string;
}
interface createPin {
  deviceId: string;
  pin: number;
}
interface updatePassword {
  oldPassword: string;
  newPassword: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  // Add more fields as necessary
}
interface MemberData {
  id: string;
  name: string;
  email: string;
  // Add more fields as necessary
}

interface UpdateUserData {
  id: string;
  name: string;
  email: string;
}
interface EmployeeInfo {
  id: string;
  name: string;
  email: string;
}

interface Item {
  id: string;
  name: string;
  price: number;
  // Add other item properties here
}
interface rateus {
  rating: number;
  feedback: string;
  projectId: number;
  // Add other item properties here
}

// Base API configuration with cookie support
 const token = getStorageToken();
 console.log(token, "token in base api++++++++++++++++")
export const api = createApi({
  
  keepUnusedDataFor: 0,
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.betweenaiagent.com/api',
    // baseUrl: 'http://10.10.10.70:3004/api',
    credentials: 'include', // Ensures cookies (like auth tokens) are sent with every request
    prepareHeaders: (headers) => {
      // Optionally, set custom headers if needed (e.g., JSON request type)
      // headers.set('Content-Type', 'application/json');
       if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;

    },
    
     headers: {
      
        Authorization: token ? `Bearer ${token}` : '',
        // Accept: token ? `application/json` : '',
      },
  }),
  endpoints: () => ({}),
  tagTypes: ['user', 'notification', 'service', 'category', 'Profile'],
  // endpoints: (builder) => ({
  //   // User login mutation
  //   loginUser: builder.mutation({
  //     query: (data) => ({
  //       url: `/auth/login`,
  //       method: 'POST', // Ensure method is explicitly defined
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       body: data,
  //     }),
  //     // invalidatesTags: ['user'],
  //   }),
  //   createPIn: builder.mutation<UserProfile, createPin>({
  //     query: (data: any) => ({
  //       url: '/pin',
  //       method: 'POST',
  //       body: data, // Credentials sent in the request body
  //     }),
  //   }),
  //   updatePasword: builder.mutation<UserProfile, updatePassword>({
  //     query: (data: any) => ({
  //       url: '/user/update-password',
  //       method: 'PUT',
  //       body: data, // Credentials sent in the request body
  //     }),
  //   }),
  //   pinVerify: builder.mutation<UserProfile, createPin>({
  //     query: (data: any) => ({
  //       url: '/pin/verify',
  //       method: 'POST',
  //       body: data, // Credentials sent in the request body
  //     }),
  //   }),
  //   // User login mutation
  //   logout: builder.mutation<UserProfile, LoginCredentials>({
  //     query: () => ({
  //       url: '/auth/logout',
  //       method: 'POST',

  //     }),
  //   }),

  //   // rating 
  //   rateus: builder.mutation<UserProfile, rateus>({
  //     query: (data: any) => ({
  //       url: '/projects/rate-us',
  //       method: 'POST',
  //       body: data,

  //     }),
  //   }),
  //   // issue 
  //   issue: builder.mutation<UserProfile, rateus>({
  //     query: (data: any) => ({
  //       url: '/issue/submit',
  //       method: 'POST',
  //       body: data,

  //     }),
  //   }),
  //   putUpdateProfile: builder.mutation<UserProfile, rateus>({
  //     query: (data: any) => ({
  //       url: '/user/update-profile',
  //       method: 'PUT',
  //       body: data,

  //     }),
  //   }),

  //   // Fetch user profile (GET request, with cookie-based session handling)
  //   fetchProfile: builder.query<UserProfile, void>({
  //     query: () => ({
  //       url: '/user/profile',
  //       method: 'GET',
  //     }),
  //   }),
  //   getMemberSearch: builder.query<MemberData, any>({
  //     query: (id) => ({
  //       url: `/user/search?member=${id}`,
  //       method: 'GET',
  //     }),
  //   }),
  //   getCustomerSearch: builder.query<MemberData, any>({
  //     query: (id) => ({
  //       url: `/user/search?customer=${id}`,
  //       method: 'GET',
  //     }),
  //   }),
  //   // Fetch Auth employee info
  //   fetchEmployeeInfo: builder.query<EmployeeInfo, void>({
  //     query: () => ({
  //       url: '/users/auth-employee',
  //       method: 'GET',
  //     }),
  //   }),

  //   // Update user info (PUT request)
  //   updateUser: builder.mutation<UserProfile, UpdateUserData>({
  //     query: (userData) => ({
  //       url: `/user/${userData.id}`,
  //       method: 'PUT',
  //       body: userData, // Update data sent in the body
  //     }),
  //   }),

  //   // Fetch list of items (GET request)
  //   fetchItems: builder.query<Item[], void>({
  //     query: () => ({
  //       url: '/items',
  //       method: 'GET',
  //     }),
  //   }),
  //   businessModel: builder.query<Item[], void>({
  //     query: () => ({
  //       url: '/business-model',
  //       method: 'GET',
  //     }),
  //   }),
  //   Projects: builder.query<Item[], void>({
  //     query: () => ({
  //       url: '/projects?orderByCol=id&orderByAsc=true&show_active_data=true&paginate=10',
  //       method: 'GET',
  //     }),
  //   }),
  //   bookingMoney: builder.query<Item[], void>({
  //     query: () => ({
  //       url: '/user/report?type=booking_money',
  //       method: 'GET',
  //     }),
  //   }),
  //   getUser: builder.query({
  //     query: () => ({
  //       url: `/users/auth/profile`,
  //       method: "GET"
  //     }),
  //     // providesTags: ["user"]
  //   }),
  //   patchUpdateUserProfile: builder.mutation({
  //     query: (formData) => ({
  //       url: '/users/auth/update-profile-by-user',
  //       method: 'PATCH',
  //       body: formData,
  //       // DO NOT set Content-Type header here
  //     }),
  //     // invalidatesTags: ['user'],
  //   }),
  // }),
});

// Export hooks for the endpoints
// export const {
//   useLoginUserMutation,      // Hook for login
//   useLogoutMutation,
//   usePinVerifyMutation,
//   useFetchProfileQuery,  // Hook for fetching profile
//   useUpdateUserMutation, // Hook for updating user
//   useFetchItemsQuery,    // Hook for fetching items
//   useFetchEmployeeInfoQuery,
//   useBusinessModelQuery,
//   useProjectsQuery,
//   useCreatePInMutation,
//   useGetMemberSearchQuery,
//   useGetCustomerSearchQuery,
//   useBookingMoneyQuery,
//   useUpdatePaswordMutation,
//   useRateusMutation,
//   useIssueMutation,
//   useGetUserQuery,
//   usePatchUpdateUserProfileMutation,

//   usePutUpdateProfileMutation,
// } = api;

// Image URL for assets (if needed)
// export const imageUrl = 'https://app.uniflexlimited.com/';
export const imageUrl = 'https://api.betweenaiagent.com';