import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { GitHubProvider } from "tinacms-gitprovider-github";
// import { RedisLevel } from 'upstash-redis-level'
import { MongodbLevel } from "mongodb-level";

const mongodbLevelStore = new MongodbLevel({
  collectionName: "tinacms",
  dbName: "tinacms",
  mongoUri: process.env.MONGODB_URI,
});

// const RedisLevel =  new RedisLevel({
//   redis: {
//     url: process.env.KV_REST_API_URL || "http://localhost:8079",
//     token: process.env.KV_REST_API_TOKEN || "example_token",
//   },
//   debug: process.env.DEBUG === "true" || false,
// });

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

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
