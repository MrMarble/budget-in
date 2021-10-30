import Gun from "gun";
import type { StateStorage } from "zustand/middleware";

const gun = Gun(); //TODO: Add server url

export const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log("GUN: get", name);
    return new Promise((resolve) => {
      gun.get(name).once((data = {}) => resolve(data.value || null));
    });
  },
  setItem: async (name: string, value: string): Promise<void> => {
    gun.get(name).put({ value });
  },
};
