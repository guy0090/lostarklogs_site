import { User } from "@/interfaces/user.interface";
import { Module } from "vuex";

/**
 * Module containing user state functions and variables.
 */
export const user: Module<any, any> = {
  state: () => ({
    avatar: localStorage.getItem("avatar") || "",
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null,
  }),
  mutations: {
    setUser(state, user: User) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    removeUser(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    setAvatar(state, avatar: string) {
      state.avatar = avatar;
      localStorage.setItem("avatar", avatar);
    },
    removeAvatar(state) {
      state.avatar = "";
      localStorage.removeItem("avatar");
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    avatar(state) {
      return state.avatar;
    },
  },
  actions: {
    parseDiscordAvatarHash(
      { dispatch },
      user: {
        id: string;
        username: string;
        discriminator: number;
        avatar: string;
        registered: string;
      }
    ): string {
      dispatch("info", "Parsing Discord avatar hash");
      const baseURL = "https://cdn.discordapp.com/";

      let avatar = "";
      if (user.avatar === null) {
        avatar = `${baseURL}/embed/avatars/${user.discriminator % 5}.png`;
      } else {
        const isGIF = user.avatar.startsWith("a_");
        avatar = `${baseURL}avatars/${user.id}/${user.avatar}${
          isGIF ? ".gif" : ".png"
        }`;
      }

      return avatar;
    },
  },
};
