import { create } from 'zustand';

export const useFormState = create((set) => ({
  isSubmitted: false,
  uspdateIsSubmitted: (submit: boolean) => set({isSubmitted: submit})
}))