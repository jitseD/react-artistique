import { createContext } from 'react';

export const canvas = createContext({
    width: window.innerWidth / 2 - 120,
    height: window.innerHeight - 120
});
