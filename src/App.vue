<template>
	<section class="section section--input">
		<form>
			<fieldset class="card">
				<legend class="card__title">Ügyfél Adatai</legend>
				<div class="card__content">
					<div class="form-group">
						<label class="form-group__label" for="customer-name">Név:</label>
						<div class="form-group__input-container">
							<input v-model="personalDetails.customerName" id="customer-name" class="form-group__input" type="text">
							<div class="form-group__input-background" :style="{width: personalDetails.customerName.length + 'ch'}"></div>
						</div>
					</div>
					<div class="form-group">
						<label class="form-group__label" for="customer-zip">Irányítószám:</label>
						<div class="form-group__input-container">
							<input v-model="personalDetails.customerZip" id="customer-zip" class="form-group__input" type="number">
						</div>
					</div>
					<div class="form-group">
						<label class="form-group__label" for="customer-city">Város:</label>
						<!-- TODO -->
						<div class="form-group__input-container">
							<input id="customer-city" class="form-group__input" type="text">
						</div>
					</div>
					<div class="form-group">
						<label class="form-group__label" for="customer-address">Lakcím:</label>
						<div class="form-group__input-container">
							<input v-model="personalDetails.customerAddress" id="customer-address" class="form-group__input" type="text">
						</div>
					</div>
				</div>
			</fieldset>
			<fieldset class="card">
				<legend class="card__title">Feladatok</legend>
				<div class="card__content">
					<div class="form-group">
						<label class="form-group__label" for="work-details">Új Feladat</label>
						<div class="form-group__input-container">
							<input v-model="workDetail" id="work-details" class="form-group__input" type="text">
						</div>
						<button @click.prevent="pushWorkDetail">Hozzáad</button>
					</div>
				</div>
				<hr>
			</fieldset>
			<fieldset>
				<label for="item-name">Anyag neve</label>
				<input v-model="itemName" id="item-name" type="text">
				<label for="item-quantity">Darabszám/hossz</label>
				<input v-model="itemQuantity" id="item-quantity" type="number">
				<select v-model="itemQuantityMeasure">
					<option value="db">db</option>
					<option value="m">m</option>
					<option value="zsák">zsák</option>
				</select>
				<label for="item-price"></label>
				<input v-model="itemPrice" id="item-price" type="number">
				<button @click.prevent="pushItem">Hozzáad</button>
			</fieldset>
			<fieldset>
				<label for="labour-cost">Munkadíj</label>
				<input v-model="labourCost" id="labour-cost" type="number">
			</fieldset>
		</form>
		<div>
			<div v-for="(work, index) in this.workDetails" :key="index">
				<input v-if="isEditing[index]" v-model="workDetails[index]" type="text">
				<span v-else>{{ work }}</span>
				<button @click.prevent="toggleEdit(index)">{{isEditing[index] ? "Mentés" : "Szerkesztés"}}</button>
				<button @click.prevent="removeWork(index)">Törlés</button>
			</div>
			<div v-for="(item, index) in this.items" :key="index">
				<input v-if="isEditing[index]" v-model="items[index].name" type="text">
				<span v-else>{{ item.name }}</span>
				<input v-if="isEditing[index]" v-model="items[index].quantity" type="number">
				<span v-else>{{ item.quantity }}</span>
				<select v-if="isEditing[index]" v-model="items[index].quantitymeasure">
					<option value="db">db</option>
					<option value="m">m</option>
					<option value="zsák">zsák</option>
				</select>
				<span v-else>{{ item.quantitymeasure }}</span>
				<input v-if="isEditing[index]" v-model="items[index].price" type="number">
				<span v-else>{{ item.price }}</span>
				<span v-if="!isEditing[index]">{{ item.price * item.quantity }}</span>
				<button @click.prevent="toggleEdit(index)">{{isEditing[index] ? "Mentés" : "Szerkesztés"}}</button>
				<button @click.prevent="removeWork(index)">Törlés</button>
			</div>
		</div>
	</section>
	<section class="section section--output">
		<div id="element-to-print">
			<p>
				{{ personalDetails.customerName }}
			</p>
			<p>
				{{ personalDetails.customerName.length }}
			</p>
			<p>
				{{ this.items }}
			</p>
			<p>
				{{ this.workDetails }}
			</p>
			<p>
				{{ materialCost }}
			</p>
			<p>
				{{ totalCost }}
			</p>
			<p>Kelt:
				{{ currentDate }}
			</p>
			<p>Ajánlat érvényessége:
				{{ expirationDate }}
			</p>
			<button @click="htmltopdf('element-to-print')">Teszt</button>
		</div>
	</section>
</template>

<script>
import moment from "moment";
import 'moment/dist/locale/hu';
import html2pdf from 'html2pdf.js'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {ref} from "vue";
moment.locale('hu')

window.html2canvas = html2canvas
window.jsPDF = jsPDF

export default {
	data() {
		return {
			workDetail: "",
			itemName: "",
			itemQuantity: "",
			itemQuantityMeasure: "db",
			itemPrice: "",
			labourCost: 5000,
			isEditing: ref([]),



			personalDetails: {
				customerName: "",
				customerZip: "",
				customerAddress: ""
			},
			workDetails: [],
			items: [],
      currentDate: moment().format('LL'),
      expirationDate: moment().add(2, 'weeks').format('LL')
		}
	},

	methods: {
		pushWorkDetail() {
			this.workDetails.push(this.workDetail)
			this.workDetail = ""
		},

		pushItem() {
			this.items.push({
				name: this.itemName,
				quantity: this.itemQuantity,
				quantitymeasure: this.itemQuantityMeasure,
				price: this.itemPrice,
				total: this.itemPrice * this.itemQuantity,
			})

			this.workDetail= ""
			this.itemName= ""
			this.itemQuantity= ""
			this.itemPrice= ""
		},

		toggleEdit(index) {
			this.isEditing[index] = !this.isEditing[index]
		},

		removeWork(index) {
			this.workDetails.splice(index, 1)
			this.isEditing.splice(index, 1)
		},

		htmltopdf(element) {
			html2pdf()
					.set({
						margin: 0,
						filename: 'download.pdf',
						image: { type: 'jpeg', quality: 1 },
						html2canvas: {
							scale: 3,         // ⬅️ Increase to 2 or 3 for sharper text
							useCORS: true     // ⬅️ If you have external images/fonts
						},
						jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
					})
					.from(document.getElementById(element))
					.save();
		}
	},


	computed: {
		materialCost: {
			get() {
				let MaterialTotal = 0;
				for (let i in this.items) {
					MaterialTotal += this.items[i].total
				}
				return MaterialTotal;
			},
			set() {
				let MaterialTotal = 0;
				for (let i in this.items) {
					MaterialTotal += this.items[i].total
				}
				return MaterialTotal
			}
		},
		totalCost: {
			get() {
				return this.materialCost + this.labourCost
			},
			set() {
				return this.materialCost + this.labourCost
			},
		},
	}
}

</script>
