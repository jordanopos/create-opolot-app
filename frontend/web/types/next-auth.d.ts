import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    role: string;
    access_token: string;
    user_id: string;
    user: {
      email: string;
      id : number;
      first_name: string;
      last_name: string;
    } & DefaultSession["user"];
  }

 // To parse this data:
//
//   import { Convert, User } from "./file";
//
//   const user = Convert.toUser(json);

export interface User {
  user:         UserClass;
  access_token: string;
}

export interface UserClass {
  id:           number;
  businessName: null;
  firstName:    string;
  lastName:     string;
  password:     string;
  phoneNumber:  null;
  email:        string;
  address:      null;
  website:      null;
  createdAt:    Date;
  updatedAt:    Date;
}

}
