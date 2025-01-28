import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from './store'; // Importa RootState desde tu store

// Define el hook useAppSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;