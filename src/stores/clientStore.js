import { defineStore } from 'pinia';

export const useClientStore = defineStore('client', {
	state: () => ({
		customerName: "",
		customerZip: "",
		customerCity: "",
		customerAddress: "",
		customerTaxNumber: ""
	})
});