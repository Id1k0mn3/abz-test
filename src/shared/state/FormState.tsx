import { create } from 'zustand';

interface UserState {
  isSubmitted: boolean;
  uspdateIsSubmitted: (submit: boolean) => void;
}

export const useFormState = create<UserState>((set) => ({
  isSubmitted: false,
  uspdateIsSubmitted: (submit) => set({isSubmitted: submit})
}))