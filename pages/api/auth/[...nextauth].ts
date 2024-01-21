import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";

interface ICredentialsInput {
    email: string;
    password: string;
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    },
    jwt: {
        maxAge: 10
    },
    secret: "hueta",
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Add logic here to look up the user from the credentials supplied
                // if (!credentials) return;
                const { email, password } = credentials as ICredentialsInput;
                const dbUser = await prisma.user.findUnique({
                    where: {
                        email
                    }
                });
                if (!dbUser) {
                    throw new Error("Користувача не знайдено\nСтворіть обліковий запис");
                }
                if (!dbUser.password) {
                    throw new Error("Невірний метод авторизації\nСпробуйте увійти за допомогою Google");
                }
                if (dbUser.password !== password) {
                    throw new Error("Неправильний пароль");
                }
                return dbUser;
            }
        })
    ],
    callbacks: {
        async signIn({ account, user, profile }) {
            try {
                console.log("SIGN IN USER", user);
                console.log("SIGN IN profile", profile);
                console.log("SIGN IN account", account);
                return true;
            } catch (e) {
                console.log(e);
                throw e;
            }

        },

        jwt({ token, trigger, session }) {
            if (trigger === "update") {
                if (session.persistForm) {
                    token.persistForm = session.persistForm;
                } else {
                    delete token.persistForm;
                }
            }

            return token;
        },
        async session({ session, token, user }) {
            if (!token?.email) return session;

            const dbUser = await prisma.user.findUnique({
                where: {
                    email: token.email
                }
            });

            session.user = dbUser;
            return session;
            // return session
            // Send properties to the client, like an access_token and user id from a provider.
        }
    }

};
export default NextAuth(authOptions);