import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
 providers: [
  GoogleProvider({
   clientId: "433921366173-obo50oq7m3ls2dqu3so5atelkc86tmdn.apps.googleusercontent.com",
   clientSecret: "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",
  }),
 ],
 session: {
  strategy: 'jwt',
 },
};
export default NextAuth(authOptions);