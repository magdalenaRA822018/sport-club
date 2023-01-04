import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux/es/exports'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { TypedUseSelectorHook } from 'react-redux/es/types';

import userSlice from './features/userSlice'
export const store = configureStore({
  reducer: {
    user: userSlice,
  },
})

export const useAppDispatch: () => typeof store.dispatch=useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;