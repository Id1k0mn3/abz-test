import { create } from 'zustand';
import { UserGet } from '../../types';
export const useUsers = create( (set) => ({
  users: [],
  updateUsers: (sortedUsers:UserGet) => set({ users: sortedUsers }),
}));