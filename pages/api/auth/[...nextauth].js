import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import clientPromise from "../../../lib/mongodb"

export const authOptions = {
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
    // ...add more providers here
  ],
  pages: {
    signIn: '/login',
  },
  session:{
    strategy: 'jwt',
  },
  callbacks: {
    session: async({token: JWT, session: session}) => {
      if(session?.user && JWT?.sub){
        session.user.id = JWT.sub;
      }
      return session;
    },
  },
}

export default NextAuth(authOptions);