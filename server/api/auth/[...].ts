import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
  secret: process.env.NUXT_SECRET || "SOME SECRET KEY",
  providers: [
    // @ts-ignore
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Your Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your Password",
        },
      },
      authorize(credentials: any) {
        // Dummy database (Will be using mongo in later development)
        const users = [
          {
            id: 1,
            username: "admin",
            password: "admin",
          },
          {
            id: 2,
            username: "user",
            password: "user",
          },
        ];

        for (const user of users) {
          if (user.username == credentials.username && user.password == credentials.password) {
            return user;
          }
        }

        // User input unregistered credentials
        return null;
      },
    }),
  ],
});
