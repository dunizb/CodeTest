import { atom } from 'recoil';

export const counterAtom = atom({
  key: 'counter',
  default: 0
})

export const counterWithId = (id) => atom({
  key: `counter${id}`,
  default: 0
})
