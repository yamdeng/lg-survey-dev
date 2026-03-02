import { create } from 'zustand';
import useSecondStore from './useSecondStore';

const useFirstStore = create<any>((set) => ({
  name: 'first',
  age: 30,
  changeName: (newName) => {
    const secondStoreName = useSecondStore.getState().name;
    set({ name: secondStoreName ? secondStoreName : newName });
  },
  changeAge: (newAge) => set(() => ({ age: newAge })),
}));

export default useFirstStore;
