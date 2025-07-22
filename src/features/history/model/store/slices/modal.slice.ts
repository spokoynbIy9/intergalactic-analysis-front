import type { StateCreator } from 'zustand';
import type { HistoryState } from '../../types/historyState.type';
import type { IModalSlice } from '../../types/modalSlice.type';

type ModalSliceCreator = StateCreator<
	HistoryState,
	[['zustand/devtools', never]],
	[],
	IModalSlice
>;

export const createModalSlice: ModalSliceCreator = (set) => ({
	isOpenModal: false,
	showModal: () => set({ isOpenModal: true }, false, 'modal/showModal'),
	hideModal: () => set({ isOpenModal: false }, false, 'modal/hideModal'),
});
