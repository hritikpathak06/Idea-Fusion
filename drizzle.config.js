/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./src/utils/model.tsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://Idea-Fusion_owner:K8kC0JQwtrWc@ep-lucky-hat-a5bq1ekp.us-east-2.aws.neon.tech/Idea-Fusion?sslmode=require",
  },
};
