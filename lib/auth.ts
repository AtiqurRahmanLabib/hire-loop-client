import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import type { StandardSchemaV1 } from "@standard-schema/spec"
import { USER_ROLES, type UserRole } from "./roles"

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL as string)
const db = client.db("hireLoop")

const roleValidator: StandardSchemaV1<string, UserRole> = {
  "~standard": {
    version: 1,
    vendor: "hire-loop",
    validate(value) {
      return typeof value === "string" &&
        (USER_ROLES as readonly string[]).includes(value)
        ? { value: value as UserRole }
        : {
            issues: [
              { message: `Role must be one of: ${USER_ROLES.join(", ")}` },
            ],
          }
    },
  },
}

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: [...USER_ROLES],
        defaultValue: "Seeker",
        input: true,
        validator: {
          input: roleValidator,
        },
      },
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
})
