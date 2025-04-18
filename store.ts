import { create } from 'zustand';

type Contact = {
  id: string;
  name: string;
  email: string;
  picture: string;
};

type Store = {
  favourites: Contact[];
  addFavourite: (contact: Contact) => void;
  removeFavourite: (id: string) => void;
};

export const useStore = create<Store>((set) => ({
  favourites: [],
  addFavourite: (contact) =>
    set((state) => ({
      favourites: [...state.favourites, contact],
    })),
  removeFavourite: (id) =>
    set((state) => ({
      favourites: state.favourites.filter((fav) => fav.id !== id),
    })),
}));
