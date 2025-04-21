interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly PORT: string;
  readonly JWT_SECRET: string;
  readonly MONGO_USER: string;
  readonly MONGO_PASS: string;
  readonly MONGO_DB: string;
  readonly MONGO_URI: string;
}

interface ImportMeta {
  env: ImportMetaEnv
}

type EnvironmentType = {
  env: {
    DATABASE_URL: string;
    PORT: string;
    JWT_SECRET: string;
    MONGO_USER: string;
    MONGO_PASS: string;
    MONGO_DB: string;
    MONGO_URI: string;
  };
};
