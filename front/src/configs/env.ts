import { EnvConfig, Environment } from "@shared_types";

export const envConfigs: Record<Environment, EnvConfig> = {
  development: {
    tsApiRoot: "http://localhost:4000/",
  },
};
