import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
	state: () => ({
		modalOpen: false,
	}),

	actions: {
		toggleModal() {
			this.modalOpen = !this.modalOpen
		},
	}
});