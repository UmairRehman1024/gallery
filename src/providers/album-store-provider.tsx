"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type AlbumStore, createAlbumStore } from "~/store/album-store";

// Type for AlbumStoreApi
export type AlbumStoreApi = ReturnType<typeof createAlbumStore>;

// Create AlbumStoreContext
export const AlbumStoreContext = createContext<AlbumStoreApi | undefined>(
  undefined,
);

export interface AlbumStoreProviderProps {
  children: ReactNode;
}

// AlbumStoreProvider Component
export const AlbumStoreProvider = ({ children }: AlbumStoreProviderProps) => {
  const storeRef = useRef<AlbumStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createAlbumStore(); // Initialize the album store
  }

  return (
    <AlbumStoreContext.Provider value={storeRef.current}>
      {children}
    </AlbumStoreContext.Provider>
  );
};

// Custom Hook to use AlbumStore
export const useAlbumStore = <T,>(selector: (store: AlbumStore) => T): T => {
  const albumStoreContext = useContext(AlbumStoreContext);

  if (!albumStoreContext) {
    throw new Error(`useAlbumStore must be used within AlbumStoreProvider`);
  }

  return useStore(albumStoreContext, selector);
};
