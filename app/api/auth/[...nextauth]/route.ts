import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// import BattleNetProvider from 'next-auth/providers/battlenet'
import DiscordProvider from "next-auth/providers/discord"
// import GithubProvider from 'next-auth/providers/github'
// import GoogleProvider from "next-auth/providers/google"
// import RedditProvider from 'next-auth/providers/reddit'
// import TwitchProvider from 'next-auth/providers/twitch'

// https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
const scopes = ["identify"].join(" ")

type BattleNetIssuer =
  | "https://www.battlenet.com.cn/oauth"
  | "https://us.battle.net/oauth"
  | "https://eu.battle.net/oauth"
  | "https://kr.battle.net/oauth"
  | "https://tw.battle.net/oauth"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = {
          id: "1",
          email: credentials?.email,
          password: credentials?.password,
        }
        return user.password?.includes(process.env.BYPASS_PHRASE as string)
          ? user
          : null
      },
    }),
    // BattleNetProvider({
    //   clientId: String(process.env.BATTLENET_CLIENT_ID),
    //   clientSecret: String(process.env.BATTLENET_CLIENT_SECRET),
    //   issuer: process.env.BATTLENET_ISSUER as BattleNetIssuer,
    // }),
    DiscordProvider({
      clientId: String(process.env.DISCORD_CLIENT_ID),
      clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
      authorization: {
        params: { scope: scopes },
      },
      async profile(profile, tokens) {
        let isAuthorized = false
        let isAdult = false

        try {
          // Fetch the guild members using the bot token
          const response = await fetch(
            `https://discord.com/api/v10/guilds/${process.env.DISCORD_SERVER_ID}/members/${profile.id}`,
            {
              headers: {
                Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
              },
            }
          )

          if (response.ok) {
            // If we can fetch the member data, they are in the server
            const memberData = await response.json()
            console.log('memberData', memberData)
            isAuthorized = true

            // Check for admin and adult roles
            const isAdmin = memberData.roles.includes(process.env.DISCORD_ADMIN_ROLE)
            console.log('isAdmin', isAdmin, memberData.roles, memberData)
            isAdult = memberData.roles.includes(process.env.DISCORD_ADULT_ROLE) || isAdmin
            console.log('isAdult', isAdult)
          }
        } catch (error) {
          console.error('Error fetching Discord member data:', error)
          isAuthorized = false
          isAdult = false
        }

        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
          isAuthorized,
          isAdult,
        }
      },
    }),
    // GithubProvider({
    //   clientId: String(process.env.GITHUB_ID),
    //   clientSecret: String(process.env.GITHUB_SECRET),
    // }),
    // GoogleProvider({
    //   clientId: String(process.env.GOOGLE_ID),
    //   clientSecret: String(process.env.GOOGLE_SECRET),
    //   authorization: {
    //     params: {
    //       prompt: "consent",
    //       access_type: "offline",
    //       response_type: "code",
    //     },
    //   },
    // }),
    // RedditProvider({
    //   clientId: String(process.env.REDDIT_CLIENT_ID),
    //   clientSecret: String(process.env.REDDIT_CLIENT_SECRET),
    //   authorization: {
    //     params: {
    //       duration: 'permanent',
    //     },
    //   },
    // // }),
    // TwitchProvider({
    //   clientId: String(process.env.TWITCH_CLIENT_ID),
    //   clientSecret: String(process.env.TWITCH_CLIENT_SECRET),
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (account.provider === "discord") {

        // Grant access only if the member has the required role
        return user.isAuthorized
      }

      // Allow sign-in for other providers
      return true
    },
    async jwt({ token, user, account, profile }: any) {
      return { ...token, ...user}
    },
    async session({ session, user, token }: any) {
      session.isAdult = token?.isAdult
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
