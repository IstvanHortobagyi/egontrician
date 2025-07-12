<template>
	<section class="section section--input">
		<form>
			<fieldset class="card">
				<legend class="card__title">Ügyfél Adatai</legend>
				<div class="card__content">
					<div class="form-group">
						<label class="label" for="customer-name">Név:</label>
						<div class="input-container">
							<input v-model="personalDetails.customerName" id="customer-name" class="input" type="text">
							<div class="input-background" :style="{width: personalDetails.customerName.length + 1 + 'ch'}"></div>
							<div class="input-caret" :style="{left: personalDetails.customerName.length + 1 + 'ch'}"></div>
						</div>
					</div>
					<div class="form-group">
						<label class="label" for="customer-zip">Irányítószám:</label>
						<div class="input-container">
							<input v-model="personalDetails.customerZip" id="customer-zip" class="input" type="number">
							<div class="input-background" :style="{width: personalDetails.customerZip.toString().length + 1 + 'ch'}"></div>
							<div class="input-caret" :style="{left: personalDetails.customerZip.toString().length + 1 + 'ch'}"></div>
						</div>
					</div>
					<div class="form-group">
						<label class="label" for="customer-city">Város:</label>
						<!-- TODO -->
						<div class="input-container">
							<input v-model="personalDetails.customerCity" id="customer-city" class="input" type="text">
							<div class="input-background" :style="{width: personalDetails.customerCity.length + 1 + 'ch'}"></div>
							<div class="input-caret" :style="{left: personalDetails.customerCity.length + 1 + 'ch'}"></div>
						</div>
					</div>
					<div class="form-group">
						<label class="label" for="customer-address">Lakcím:</label>
						<div class="input-container">
							<input v-model="personalDetails.customerAddress" id="customer-address" class="input" type="text">
							<div class="input-background" :style="{width: personalDetails.customerAddress.length + 1 + 'ch'}"></div>
							<div class="input-caret" :style="{left: personalDetails.customerAddress.length + 1 + 'ch'}"></div>
						</div>
					</div>
				</div>
			</fieldset>
			<fieldset class="card">
				<legend class="card__title">Feladatok</legend>
				<div class="card__content">
					<div class="form-group mb-0">
						<label class="label" for="work-details">Új feladat</label>
						<div class="input-container">
							<input v-model="workDetail" id="work-details" class="input" type="text">
							<div class="input-background" :style="{width: workDetail.length + 1 + 'ch'}"></div>
							<div class="input-caret" :style="{left: workDetail.length + 1 + 'ch'}"></div>
						</div>
						<button class="btn btn--small ml-1" @click.prevent="pushWorkDetail($event)">+</button>
					</div>
				</div>
				<hr v-if="workDetails[0]">
				<div v-if="workDetails[0]" class="card__content">
					<table>
						<thead>
							<tr>
								<th>Feladat Neve</th>
								<th>Műveletek</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(work, index) in this.workDetails" :key="index">
								<td>
									<div v-if="isEditing[index]" class="input-container">
										<input v-model="workDetails[index]" class="input" type="text">
										<div class="input-background" :style="{width: workDetails[index].length + 1 + 'ch'}"></div>
										<div class="input-caret" :style="{left: workDetails[index].length + 1 + 'ch'}"></div>
									</div>
									<span v-else>{{ work }}</span>
								</td>
								<td>
									<button class="text-button" @click.prevent="toggleEdit(index)">{{isEditing[index] ? "[&nbsp;Mentés&nbsp;]" : "[&nbsp;Szerkesztés&nbsp;]"}}</button>
									<button class="text-button" @click.prevent="removeWork(index)">[&nbsp;Törlés&nbsp;]</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</fieldset>
			<fieldset class="card">
				<legend class="card__title">Anyagok</legend>
				<div class="card__content">
					<div class="form-group">
						<label class="label" for="item-name">Anyag neve:</label>
						<div class="input-container">
							<input v-model="itemName" id="item-name" class="input" type="text">
							<div class="input-background" :style="{width: itemName.length + 1 + 'ch'}"></div>
							<div class="input-caret" :style="{left: itemName.length + 1 + 'ch'}"></div>
						</div>
					</div>
					<div class="form-group">
						<label class="label" for="item-quantity">Mennyiség:</label>
						<div class="input-container">
							<input v-model="itemQuantity" id="item-quantity" class="input" type="number">
							<div class="input-background" :style="{width: itemQuantity.toString().length + 1 + 'ch'}"></div>
							<div class="input-caret" :style="{left: itemQuantity.toString().length + 1 + 'ch'}"></div>
						</div>
					</div>
					<div class="form-group">
						<div class="radbox">
							<input id="radio1" class="radbox__input" type="radio" name="unit">
							<label for="radio1" class="radbox__label">darab</label>
						</div>
						<div class="radbox">
							<input id="radio2" class="radbox__input" type="radio" name="unit">
							<label for="radio2" class="radbox__label">méter</label>
						</div>
						<div class="radbox">
							<input id="radio3" class="radbox__input" type="radio" name="unit">
							<label for="radio3" class="radbox__label">zsák</label>
						</div>
						<!-- <select v-model="itemQuantityMeasure">
							<option value="db">db</option>
							<option value="m">m</option>
							<option value="zsák">zsák</option>
						</select> -->
					</div>
					<div class="form-group">
						<label class="label" for="item-price">Egységár:</label>
						<div class="input-container">
							<input v-model="itemPrice" id="item-price" class="input" type="number">
							<div class="input-background" :style="{width: itemPrice.toString().length + 1 + 'ch'}"></div>
							<div class="input-caret" :style="{left: itemPrice.toString().length + 1 + 'ch'}"></div>
						</div>
					</div>
					<button @click.prevent="pushItem($event)">Hozzáad</button>
				</div>
				<hr>
				<div class="card__content">
					<table>
						<thead>
							<tr>
								<th>Anyag</th>
								<th>Mennyiség</th>
								<th>Egységár</th>
								<th>Műveletek</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in this.items" :key="index">
								<td>
									<div v-if="isEditing[index]" class="input-container">
										<input v-model="items[index].name" class="input" type="text">
										<div class="input-background" :style="{width: items[index].name.length + 1 + 'ch'}"></div>
										<div class="input-caret" :style="{left: items[index].name.length + 1 + 'ch'}"></div>
									</div>
									<span v-else>{{ item.name }}</span>
								</td>
								<td>
									<div v-if="isEditing[index]" class="input-container">
										<input v-model="items[index].quantity" class="input" type="number">
										<div class="input-background" :style="{width: items[index].quantity.toString().length + 1 + 'ch'}"></div>
										<div class="input-caret" :style="{left: items[index].quantity.toString().length + 1 + 'ch'}"></div>
									</div>
									<span v-else>{{ item.quantity }} {{ item.unit }}</span>
								</td>
								<td>
									<div v-if="isEditing[index]" class="input-container">
										<input v-model="items[index].price" class="input" type="number">
										<div class="input-background" :style="{width: items[index].price.toString().length + 1 + 'ch'}"></div>
										<div class="input-caret" :style="{left: items[index].price.toString().length + 1 + 'ch'}"></div>
									</div>
									<span v-else>{{ item.price }}</span>
									<!-- TODO: Total Price kiíratás -->
								</td>
								<td>
									<button class="text-button" @click.prevent="toggleEdit(index)">{{isEditing[index] ? "[&nbsp;Mentés&nbsp;]" : "[&nbsp;Szerkesztés&nbsp;]"}}</button>
									<!-- TODO: removeItem -->
									<button class="text-button" @click.prevent="removeWork(index)">[&nbsp;Törlés&nbsp;]</button>
								</td>
							</tr>
						</tbody>
					</table>



					<!-- <select v-if="isEditing[index]" v-model="items[index].quantitymeasure">
						<option value="db">db</option>
						<option value="m">m</option>
						<option value="zsák">zsák</option>
					</select>
					<span v-else>{{ item.quantitymeasure }}</span>

					<span v-if="!isEditing[index]">{{ item.price * item.quantity }}</span>

					<button @click.prevent="toggleEdit(index)">{{isEditing[index] ? "Mentés" : "Szerkesztés"}}</button>
					<button @click.prevent="removeWork(index)">Törlés</button> -->
				</div>
			</fieldset>
			<fieldset>
				<label for="labour-cost">Munkadíj</label>
				<input v-model="labourCost" id="labour-cost" type="number">
			</fieldset>
		</form>
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
				customerCity: "",
				customerAddress: ""
			},
			workDetails: [],
			items: [],
      currentDate: moment().format('LL'),
      expirationDate: moment().add(2, 'weeks').format('LL')
		}
	},

	methods: {
		pushWorkDetail(event) {
			this.workDetails.push(this.workDetail)
			this.workDetail = ""

			event.target.blur()
		},

		pushItem(event) {
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

			event.target.blur()
		},

		toggleEdit(index) {
			this.isEditing[index] = !this.isEditing[index]
			index.target.blur()
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
