import { defineStore } from 'pinia';
import { useErrorStore } from '@/stores/errorStore.js';
import { useModalStore } from '@/stores/modalStore.js'
import {ref} from "vue";

export const useDetailsStore = defineStore('details', {
	state: () => ({
		workDetail: "",
		isEditingWork: ref([]),
		workDetails: []
	}),

	actions: {
		pushWorkDetail() {
			let errors = useErrorStore()
			let modalStore = useModalStore()
			if (errors.validateInputs({"Új feladat" : this.workDetail})) {
				this.workDetails.push(this.workDetail)
				this.workDetail = ""
			} else {
				modalStore.toggleModal();
			}
		},

		removeWork(index) {
			this.workDetails.splice(index, 1)
			this.isEditingWork.splice(index, 1)
		},
	}
});