import { defineStore } from 'pinia';
import { useErrorStore } from '@/stores/errorStore.js';
import { useModalStore} from "@/stores/modalStore.js";
import {ref} from "vue";

export const useAncillaryStore = defineStore('ancillary', {
	state: () => ({
		ancillaryCostName: "",
		ancillaryCostPrice: "",
		isEditingAncillary: ref([]),
		ancillaryCosts: []
	}),

	actions: {
		pushAncillary() {
			let errors = useErrorStore();
			let modalStore = useModalStore();

			if (errors.validateInputs({"Megnevezés" : this.ancillaryCostName, "Ár": this.ancillaryCostPrice})) {

				this.ancillaryCosts.push({
					name: this.ancillaryCostName,
					price: this.ancillaryCostPrice,
				})

				this.ancillaryCostName = ""
				this.ancillaryCostPrice = ""

			} else {
				modalStore.toggleModal()
			}
		},

		removeAncillary(index) {
			this.ancillaryCosts.splice(index, 1)
			this.isEditingAncillary.splice(index, 1)
		},
	},

	getters: {
		ancillaryCost() {
			return this.ancillaryCosts.reduce((sum, item) => {
				const price = parseFloat(item.price);
				return sum + (isNaN(price) ? 0 : price);
			}, 0);
		}
	}
});