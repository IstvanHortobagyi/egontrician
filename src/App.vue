<template>
	<!-- TODO:
		- Ne lehessen üres sorokat beküldeni
	-->
	<section class="section section--input">
		<form>
			<fieldset class="card">
				<legend class="card__title">Ügyfél Adatok</legend>
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
					<div class="form-group">
						<label class="label" for="customer-address">Adószám(opcionális):</label>
						<div class="input-container">
							<input v-model="personalDetails.customerTaxNumber" id="customer-address" class="input" type="text">
							<div class="input-background" :style="{width: personalDetails.customerTaxNumber.length + 1 + 'ch'}"></div>
							<div class="input-caret" :style="{left: personalDetails.customerTaxNumber.length + 1 + 'ch'}"></div>
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
							<input v-model="workDetail" @keyup.enter="pushWorkDetail()" id="work-details" class="input" type="text">
							<div class="input-background" :style="{width: workDetail.length + 1 + 'ch'}"></div>
							<div class="input-caret" :style="{left: workDetail.length + 1 + 'ch'}"></div>
						</div>
						<button class="btn btn--small ml-1" @click.prevent="pushWorkDetail()" type="button">+</button>
					</div>
				</div>
				<hr v-if="workDetails.length">
				<div v-if="workDetails.length" class="card__content">
					<table class="table table--input">
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
										<input v-model="workDetails[index]" @keyup.enter="toggleEdit(index)" class="input" type="text">
										<div class="input-background" :style="{width: workDetails[index].length + 1 + 'ch'}"></div>
										<div class="input-caret" :style="{left: workDetails[index].length + 1 + 'ch'}"></div>
									</div>
									<span v-else>{{ work }}</span>
								</td>
								<td>
									<button class="text-button" @click.prevent="toggleEdit(index)" type="button">{{isEditing[index] ? "[Mentés]" : "[Szerkesztés]"}}</button>
									<button class="text-button" @click.prevent="removeWork(index)" type="button">[Törlés]</button>
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
							<input v-model="itemName" @keyup.enter="pushItem()" id="item-name" class="input" type="text">
							<div class="input-background" :style="{width: itemName.length + 1 + 'ch'}"></div>
							<div class="input-caret" :style="{left: itemName.length + 1 + 'ch'}"></div>
						</div>
					</div>
					<div class="form-group">
						<label class="label" for="item-quantity">Mennyiség:</label>
						<div class="input-container">
							<input v-model.number="itemQuantity" @keyup.enter="pushItem()" id="item-quantity" class="input" type="number">
							<div class="input-background" :style="{width: itemQuantity.toString().length + 1 + 'ch'}"></div>
							<div class="input-caret" :style="{left: itemQuantity.toString().length + 1 + 'ch'}"></div>
						</div>
					</div>
					<div class="form-group">
						<div class="radbox">
							<input v-model="itemUnit" value="darab" id="radio1" class="radbox__input" type="radio" name="unit">
							<label for="radio1" class="radbox__label">darab</label>
						</div>
						<div class="radbox">
							<input v-model="itemUnit" value="méter" id="radio2" class="radbox__input" type="radio" name="unit">
							<label for="radio2" class="radbox__label">méter</label>
						</div>
						<div class="radbox">
							<input v-model="itemUnit" value="zsák" id="radio3" class="radbox__input" type="radio" name="unit">
							<label for="radio3" class="radbox__label">zsák</label>
						</div>
						<div class="radbox">
							<input v-model="itemUnit" value="csomag" id="radio4" class="radbox__input" type="radio" name="unit">
							<label for="radio4" class="radbox__label">csomag</label>
						</div>
					</div>
					<div class="form-group">
						<label class="label" for="item-price">Egységár:</label>
						<div class="input-container">
							<input v-model.number="itemPrice" @keyup.enter="pushItem()" id="item-price" class="input" type="number">
							<div class="input-background" :style="{width: itemPrice.toString().length + 1 + 'ch'}"></div>
							<div class="input-caret" :style="{left: itemPrice.toString().length + 1 + 'ch'}"></div>
						</div>
					</div>
					<button @click.prevent="pushItem()" class="btn btn--small" type="button">+</button>
				</div>
				<hr v-if="materials.length">
				<div v-if="materials.length" class="card__content">
					<table class="table table--input">
						<thead>
							<tr>
								<th>Anyag</th>
								<th>Mennyiség</th>
								<th>Egységár</th>
								<th>Műveletek</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item, index) in this.materials" :key="index">
								<td>
									<div v-if="isEditing[index]" class="input-container">
										<input v-model="materials[index].name" @keyup.enter="toggleEdit(index)" class="input" type="text">
										<div class="input-background" :style="{width: materials[index].name.length + 1 + 'ch'}"></div>
										<div class="input-caret" :style="{left: materials[index].name.length + 1 + 'ch'}"></div>
									</div>
									<span v-else>{{ item.name }}</span>
								</td>
								<td>
									<div v-if="isEditing[index]" class="input-container">
										<input v-model.number="materials[index].quantity" @keyup.enter="toggleEdit(index)" class="input" type="number">
										<div class="input-background" :style="{width: materials[index].quantity.toString().length + 1 + 'ch'}"></div>
										<div class="input-caret" :style="{left: materials[index].quantity.toString().length + 1 + 'ch'}"></div>
									</div>
									<span v-else>{{ item.quantity }} {{ item.unit }}</span>
								</td>
								<td>
									<div v-if="isEditing[index]" class="input-container">
										<input v-model.number="materials[index].price" @keyup.enter="toggleEdit(index)" class="input" type="number">
										<div class="input-background" :style="{width: materials[index].price.toString().length + 1 + 'ch'}"></div>
										<div class="input-caret" :style="{left: materials[index].price.toString().length + 1 + 'ch'}"></div>
									</div>
									<span v-else>{{ item.price }}</span>
									<!-- <span v-if="!isEditing[index]">{{ item.quantity * item.price }}</span> -->
								</td>
								<td>
									<button class="text-button" @click.prevent="toggleEdit(index)" type="button">{{isEditing[index] ? "[Mentés]" : "[Szerkesztés]"}}</button>
									<button class="text-button" @click.prevent="removeItem(index)" type="button">[Törlés]</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</fieldset>
			<fieldset class="card">
				<legend class="card__title">Egyéb Költségek</legend>
				<div class="card__content">
					<div class="form-group">
						<label class="label" for="ancillary-cost-name">Megnevezés</label>
						<div class="input-container">
							<input v-model="ancillaryCostName" @keyup.enter="pushAncillary()" id="ancillary-cost-name" class="input" type="text">
							<div class="input-background" :style="{width: ancillaryCostName.length + 1 + 'ch'}"></div>
							<div class="input-caret" :style="{left: ancillaryCostName.length + 1 + 'ch'}"></div>
						</div>
					</div>
					<div class="form-group">
						<label class="label" for="ancillary-cost-price">Ár</label>
						<div class="input-container">
							<input v-model="ancillaryCostPrice" @keyup.enter="pushAncillary()" id="ancillary-cost-price" class="input" type="number">
							<div class="input-background" :style="{width: ancillaryCostPrice.toString().length + 1 + 'ch'}"></div>
							<div class="input-caret" :style="{left: ancillaryCostPrice.toString().length + 1 + 'ch'}"></div>
						</div>
					</div>
					<button @click.prevent="pushAncillary()" class="btn btn--small" type="button">+</button>
				</div>
				<hr v-if="ancillaryCosts.length">
				<div v-if="ancillaryCosts.length" class="card__content">
					<table class="table table--input">
						<thead>
							<tr>
								<th>Megnevezés</th>
								<th>Ár</th>
								<th>Műveletek</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(ancillaryCost, index) in this.ancillaryCosts" :key="index">
								<td>
									<div v-if="isEditing[index]" class="input-container">
										<input v-model="ancillaryCosts[index].name" type="text">
										<div class="input-background" :style="{width: ancillaryCosts[index].name.toString().length + 1 + 'ch'}"></div>
										<div class="input-caret" :style="{left: ancillaryCosts[index].name.toString().length + 1 + 'ch'}"></div>
									</div>
									<span v-else>{{ ancillaryCost.name }}</span>
								</td>
								<td>
									<div v-if="isEditing[index]" class="input-container">
										<input v-model="ancillaryCosts[index].price" type="number">
										<div class="input-background" :style="{width: ancillaryCosts[index].price.toString().length + 1 + 'ch'}"></div>
										<div class="input-caret" :style="{left: ancillaryCosts[index].price.toString().length + 1 + 'ch'}"></div>
									</div>
									<span v-else>{{ ancillaryCost.price }}</span>
								</td>
								<td>
									<button class="text-button" @click.prevent="toggleEdit(index)" type="button">{{isEditing[index] ? "[Mentés]" : "[Szerkesztés]"}}</button>
									<button class="text-button" @click.prevent="removeItem(index)" type="button">[Törlés]</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</fieldset>
		</form>
		<button @click="htmltopdf('element-to-print')">PDF Letöltése</button>
	</section>
	<section class="section section--output">
		<div class="paper-bg">
			<div id="element-to-print" class="paper">
				<header class="paper__header">
					<!-- <img src="" alt=""> -->
					<strong>Stefán Egon e.v.</strong> <br>
					<address>2081 Piliscsaba, Ferenc-forrás útja 45.</address>
					<dl class="header-details">
						<div class="header-details__item">
							<dt class="header-details__key">Adószám:</dt>
							<dd class="header-details__value">88888888-8-88</dd>
						</div>
						<div class="header-details__item">
							<dt class="header-details__key">Telefon:</dt>
							<dd class="header-details__value"><a href="tel:+36307331194">+36307331194</a></dd>
						</div>
						<div class="header-details__item">
							<dt class="header-details__key">Email:</dt>
							<dd class="header-details__value"><a href="mailto:egon@sevill.hu">egon@sevill.hu</a></dd>
						</div>
					</dl>
				</header>

				<strong>{{ personalDetails.customerName ? personalDetails.customerName : "Vevő Neve" }}</strong>
				<address>
					{{ personalDetails.customerZip ? personalDetails.customerZip : "Irányítószám" }}
					{{ personalDetails.customerCity ? personalDetails.customerCity : "Város" }},
					{{ personalDetails.customerAddress ? personalDetails.customerAddress : "Lakcím" }}
				</address>
				<p>{{ personalDetails.customerTaxNumber ? personalDetails.customerTaxNumber : "Adószám" }}</p>

				<div v-if="workDetails.length">
					<h3>Feladatok</h3>
					<ul>
						<li v-for="task in this.workDetails">{{ task }}</li>
					</ul>
				</div>

				<h3 v-if="ancillaryCosts.length || materials.length">Költségek</h3>
				<table class="table table--output">
					<tbody>
						<tr v-if="materials.length">
							<td colspan="4"><strong>Anyagköltség</strong></td>
						</tr>
						<tr v-if="materials.length">
							<th>Megnevezés</th>
							<th>Mennyiség</th>
							<th>Egységár</th>
							<th class="text-right">Összesen</th>
						</tr>
						<tr v-if="materials.length" v-for="material in this.materials">
							<td>{{ material.name }}</td>
							<td>{{ material.quantity }}&nbsp;{{ material.unit }}</td>
							<td>{{ formatNumber(material.price) }}&nbsp;Ft/{{ material.unit }}</td>
							<td class="text-right">{{ formatNumber(material.price * material.quantity) }}&nbsp;Ft</td>
						</tr>
						<tr v-if="materials.length">
							<th colspan="3">Anyagköltség összesen</th>
							<td class="text-right"><strong>{{ formatNumber(materialCost) }}&nbsp;Ft</strong></td>
						</tr>
						<tr>
							<td></td>
						</tr>
						<tr v-if="ancillaryCosts.length">
							<td colspan="4"><strong>Egyéb Költségek</strong></td>
						</tr>
						<tr v-if="ancillaryCosts.length">
							<th colspan="3">Megnevezés</th>
							<th class="text-right">Összesen</th>
						</tr>
						<tr v-if="ancillaryCosts.length" v-for="ancillary in this.ancillaryCosts">
							<td colspan="3">{{ ancillary.name }}</td>
							<td class="text-right">{{ formatNumber(ancillary.price) }}&nbsp;Ft</td>
						</tr>
						<tr v-if="ancillaryCosts.length">
							<th colspan="3">Egyéb költségek összesen</th>
							<td class="text-right"><strong>{{ formatNumber(ancillaryCost) }}&nbsp;Ft</strong></td>
						</tr>
						<tr>
							<td></td>
						</tr>
						<tr class="table__footer">
							<td colspan="3"><h3 class="mt-0">Végösszeg</h3></td>
							<td class="text-right"><h3 class="mt-0">{{ formatNumber(totalCost) }}&nbsp;Ft</h3></td>
						</tr>
					</tbody>
				</table>

				<p>Kelt: Piliscsaba, {{ currentDate }}</p>
				<p>Az árak tájékoztató jellegűek.</p>
				<p>Ajánlat érvényessége: {{ expirationDate }}</p>
			</div>
		</div>
	</section>

	<dialog class="modal">
		<div class="modal-container">
			<h2 class="modal__title">Warning</h2>
			<p>No network found.</p>
			<button class="modal__button btn btn--small" type="button">Ok</button>
		</div>
	</dialog>
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
			itemUnit: "darab",
			itemPrice: "",
			ancillaryCostName: "",
			ancillaryCostPrice: "",
			isEditing: ref([]),



			personalDetails: {
				customerName: "",
				customerZip: "",
				customerCity: "",
				customerAddress: "",
				customerTaxNumber: ""
			},

			workDetails: [],
			materials: [],
			ancillaryCosts: [],
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
			if (this.itemQuantity === "") {
				this.itemQuantity = 1
			}

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
		},

		pushAncillary() {
			this.ancillaryCosts.push({
				name: this.ancillaryCostName,
				price: this.ancillaryCostPrice,
			})

			this.ancillaryCostName = ""
			this.ancillaryCostPrice = ""
		},

		toggleEdit(index) {
			this.isEditing[index] = !this.isEditing[index]
		},

		removeWork(index) {
			this.workDetails.splice(index, 1)
			this.isEditing.splice(index, 1)
		},

		removeItem(index) {
			this.materials.splice(index, 1)
			this.isEditing.splice(index, 1)
		},

		formatNumber(num) {
			return new Intl.NumberFormat('en-US', {
				useGrouping: true
			}).format(num).replace(/,/g, ' ');
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
		totalCost: {
			get() {
				return this.materialCost + this.ancillaryCost
			},
			set() {
				return this.materialCost + this.ancillaryCost
			},
		},
		materialCost() {
		return this.materials.reduce((sum, item) => {
				const price = parseFloat(item.price);
				const quantity = parseFloat(item.quantity);
				return sum + (isNaN(price) ? 0 : price * quantity);
			}, 0);
		},
		ancillaryCost() {
			return this.ancillaryCosts.reduce((sum, item) => {
				const price = parseFloat(item.price);
				return sum + (isNaN(price) ? 0 : price);
			}, 0);
		}
	}
}

</script>
