import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { GitHubProvider } from "tinacms-gitprovider-github";
// import { RedisLevel } from 'upstash-redis-level'
import { MongodbLevel } from "mongodb-level";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const mongodbLevelStore = isLocal
  ? null
  : new MongodbLevel({
      collectionName: "tinacms",
      dbName: "tinacms",
      mongoUri: process.env.MONGODB_URI,
    });

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        branch,
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
      }),
      databaseAdapter: mongodbLevelStore,
      namespace: branch,
    });
