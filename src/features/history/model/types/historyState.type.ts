import type { IHistorySlice } from './historySlice.type';
import type { IModalSlice } from './modalSlice.type';
import type { ISharedSlice } from './sharedSlice.type';

export type HistoryState = IHistorySlice & IModalSlice & ISharedSlice;
