import { Module } from "vuex";

/**
 * Module containing environment related functions and variables.
 */
export const env: Module<any, any> = {
  state: () => ({
    logLevel:
      localStorage.getItem("loglevel") ||
      (process.env.NODE_ENV === "development" ? "debug" : "none"),
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost"
        : "https://api.dps.arsha.io",
    authUrl:
      process.env.NODE_ENV === "development"
        ? "https://discord.com/api/oauth2/authorize?client_id=971989082274136185&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin&response_type=code&scope=identify&prompt=none"
        : "https://discord.com/api/oauth2/authorize?client_id=971989082274136185&redirect_uri=https%3A%2F%2Fdps.arsha.io%2Flogin&response_type=code&scope=identify&prompt=none",
  }),
  mutations: {
    setLogLevel(state, value: string) {
      state.logLevel = value;
      localStorage.setItem("loglevel", value);
    },
  },
  getters: {
    logLevel: (state) => state.logLevel,
    apiUrl: (state) => state.apiUrl,
    authUrl: (state) => state.authUrl,
  },
};
