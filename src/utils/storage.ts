import { BuilderState } from '../types/builder';

const STORAGE_KEY = 'memcoin_builder_state';

export function saveBuilderState(state: BuilderState): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Failed to save state:', error);
  }
}

export function loadBuilderState(): BuilderState | null {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState) {
      return JSON.parse(serializedState);
    }
  } catch (error) {
    console.error('Failed to load state:', error);
  }
  return null;
}