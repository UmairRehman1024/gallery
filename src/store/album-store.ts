import { createStore } from "zustand/vanilla";

export type AlbumState = {
  IDs: number[];
};

export type AlbumActions = {
  push: (newAlbum: number) => void; // Push a new album ID to the stack
  pop: () => number | null; // Pop the last album ID from the stack and return the new last element
  getCurrent: () => number | null;
};

export type AlbumStore = AlbumState & AlbumActions;

export const defaultInitState: AlbumState = {
  IDs: [],
};

export const createAlbumStore = (initState: AlbumState = defaultInitState) => {
  return createStore<AlbumStore>()((set, get) => ({
    ...initState,
    push: (newAlbum: number) => {
      set((state) => ({
        IDs: [...state.IDs, newAlbum], // Immutable push
      }));
    },
    pop: () => {
      const state = get();
      const newIDs = state.IDs.slice(0, -1); // Create a new array without the last element

      set(() => ({
        IDs: newIDs,
      }));

      const parentID = newIDs[newIDs.length - 1];

      if (parentID == undefined) {
        return null;
      } else {
        return parentID;
      }
    },
    getCurrent: () => {
      const state = get();

      if (state.IDs.length == 0) return null;

      const currentID = state.IDs[state.IDs.length - 1];

      if (currentID == undefined) {
        return null;
      } else {
        return currentID;
      }
    },
  }));
};
