import { defineStore } from 'pinia';
import { useErrorStore } from '@/stores/errorStore.js';
import { useModalStore} from "@/stores/modalStore.js";
import {ref} from "vue";

export const useMaterialStore = defineStore('materials', {
	state: () => ({
		itemName: "",
		itemQuantity: "",
		itemUnit: "darab",
		itemPrice: "",
		isEditingMaterial: ref([]),
		materials: []
	}),

	actions: {
		pushItem() {
			if (this.itemQuantity === "") {
				this.itemQuantity = 1
			}

			let errors = useErrorStore();
			let modalStore = useModalStore()

			if (errors.validateInputs({"Anyag neve" : this.itemName, "Egységár" : this.itemPrice})) {

				this.materials.push({
					name: this.itemName,
					quantity: this.itemQuantity,
					unit: this.itemUnit,
					price: this.itemPrice,
					total: this.itemQuantity * this.itemPrice
				})

				this.workDetail= ""
				this.itemName= ""
				this.itemQuantity= ""
				this.itemUnit= "darab"
				this.itemPrice= ""

			} else {
				modalStore.toggleModal()
			}
		},

		removeItem(index) {
			this.materials.splice(index, 1)
			this.isEditingMaterial.splice(index, 1)
		},
	},

	getters: {
		materialCost() {
			return this.materials.reduce((sum, item) => {
				const price = parseFloat(item.price);
				const quantity = parseFloat(item.quantity);
				return sum + (isNaN(price) ? 0 : price * quantity);
			}, 0);
		},
	}
});