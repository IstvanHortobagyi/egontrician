import { defineStore } from 'pinia';

export const useErrorStore = defineStore('errors', {
	state: () => ({
		errors: []
	}),

	actions: {
		validateInputs(inputs) {
			this.errors = [];

			Object.keys(inputs).forEach((key) => {
				if (inputs[key] === "") {
					this.errors.push(key)
				}
			})

			return this.errors.length <= 0;
		},
	}
});