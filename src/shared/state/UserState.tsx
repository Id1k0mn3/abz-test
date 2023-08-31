import { create } from 'zustand';
import { UserGet } from '../../types';


interface UserState {
  users: UserGet[];
  updateUsers: (sortedUsers: UserGet[]) => void;
}

export const useUsers = create<UserState>((set) => ({
  users: [],
  updateUsers: (sortedUsers) => set({ users: sortedUsers }),
}));