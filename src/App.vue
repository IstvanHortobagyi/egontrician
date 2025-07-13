<template>
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
							<input v-model="itemQuantity" @keyup.enter="pushItem()" id="item-quantity" class="input" type="number">
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
					</div>
					<div class="form-group">
						<label class="label" for="item-price">Egységár:</label>
						<div class="input-container">
							<input v-model="itemPrice" @keyup.enter="pushItem()" id="item-price" class="input" type="number">
							<div class="input-background" :style="{width: itemPrice.toString().length + 1 + 'ch'}"></div>
							<div class="input-caret" :style="{left: itemPrice.toString().length + 1 + 'ch'}"></div>
						</div>
					</div>
					<button @click.prevent="pushItem()" class="btn btn--small" type="button">+</button>
				</div>
				<hr v-if="items.length">
				<div v-if="items.length" class="card__content">
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
							<tr v-for="(item, index) in this.items" :key="index">
								<td>
									<div v-if="isEditing[index]" class="input-container">
										<input v-model="items[index].name" @keyup.enter="toggleEdit(index)" class="input" type="text">
										<div class="input-background" :style="{width: items[index].name.length + 1 + 'ch'}"></div>
										<div class="input-caret" :style="{left: items[index].name.length + 1 + 'ch'}"></div>
									</div>
									<span v-else>{{ item.name }}</span>
								</td>
								<td>
									<div v-if="isEditing[index]" class="input-container">
										<input v-model="items[index].quantity" @keyup.enter="toggleEdit(index)" class="input" type="number">
										<div class="input-background" :style="{width: items[index].quantity.toString().length + 1 + 'ch'}"></div>
										<div class="input-caret" :style="{left: items[index].quantity.toString().length + 1 + 'ch'}"></div>
									</div>
									<span v-else>{{ item.quantity }} {{ item.unit }}</span>
								</td>
								<td>
									<div v-if="isEditing[index]" class="input-container">
										<input v-model="items[index].price" @keyup.enter="toggleEdit(index)" class="input" type="number">
										<div class="input-background" :style="{width: items[index].price.toString().length + 1 + 'ch'}"></div>
										<div class="input-caret" :style="{left: items[index].price.toString().length + 1 + 'ch'}"></div>
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
							<input id="ancillary-cost-name" class="input" type="text">
							<!-- TODO: ":style" -->
							<div class="input-background" style="{width: TODO.length + 1 + 'ch'}"></div>
							<div class="input-caret" style="{left: TODO.length + 1 + 'ch'}"></div>
						</div>
					</div>
					<div class="form-group">
						<label class="label" for="ancillary-cost-price">Ár</label>
						<div class="input-container">
							<input id="ancillary-cost-price" class="input" type="number">
							<!-- TODO: ":style" -->
							<div class="input-background" style="{width: TODO.length + 1 + 'ch'}"></div>
							<div class="input-caret" style="{left: TODO.length + 1 + 'ch'}"></div>
						</div>
					</div>
					<button class="btn btn--small" type="button">+</button>
				</div>
				<hr>
				<div class="card__content">
					<table class="table table--input">
						<thead>
							<tr>
								<th>Megnevezés</th>
								<th>Ár</th>
								<th>Műveletek</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Név</td>
								<td>50.000</td>
								<td>
									<button class="text-button" type="button">[Szerkesztés]</button>
									<button class="text-button" type="button">[Törlés]</button>
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

				<h3>Feladatok</h3>
				<ul>
					<li v-for="task in this.workDetails">{{ task }}</li>
				</ul>

				<h3>Költségek</h3>
				<table class="table table--output">
					<tr>
						<td colspan="4"><strong>Anyagköltség</strong></td>
					</tr>
					<tr>
						<th>Megnevezés</th>
						<th>Mennyiség</th>
						<th>Egységár</th>
						<th class="text-right">Összesen</th>
					</tr>
					<tr v-for="material in this.items">
						<td>{{ material.name }}</td>
						<td>{{ material.quantity }}&nbsp;{{ material.unit }}</td>
						<td>{{ material.price }}&nbsp;Ft/{{ material.unit }}</td>
						<td class="text-right">{{ material.total }}&nbsp;Ft</td>
					</tr>
					<tr>
						<th colspan="3">Anyagköltség összesen</th>
						<td class="text-right"><strong>{{ materialCost }}&nbsp;Ft</strong></td>
					</tr>
					<tr>
						<td></td>
					</tr>
					<tr>
						<td colspan="4"><strong>Egyéb Költségek</strong></td>
					</tr>
					<tr>
						<th colspan="3">Megnevezés</th>
						<th class="text-right">Összesen</th>
					</tr>
					<tr>
						<td colspan="3">Munkadíj</td>
						<td class="text-right">120000&nbsp;Ft</td>
						<!-- TODO: ezres tördelés -->
					</tr>
					<tr>
						<td colspan="3">Üzemanyag-költség</td>
						<td class="text-right">7500&nbsp;Ft</td>
					</tr>
					<tr>
						<th colspan="3">Egyéb költségek összesen</th>
						<td class="text-right"><strong>{{ totalCost }}&nbsp;Ft</strong></td>
					</tr>
					<tr>
						<td></td>
					</tr>
					<tr class="table__footer">
						<td colspan="3"><h3 class="mt-0">Végösszeg</h3></td>
						<td class="text-right"><h3 class="mt-0">{{ totalCost }}&nbsp;Ft</h3></td>
					</tr>
				</table>

				<p>Kelt: Piliscsaba, {{ currentDate }}</p>
				<p>Ajánlat érvényessége: {{ expirationDate }}</p>
			</div>
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
			itemUnit: "darab",
			itemPrice: "",
			labourCost: "",
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

		pushItem() {
			this.items.push({
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

		toggleEdit(index) {
			this.isEditing[index] = !this.isEditing[index]
		},

		removeWork(index) {
			this.workDetails.splice(index, 1)
			this.isEditing.splice(index, 1)
		},

		removeItem(index) {
			this.items.splice(index, 1)
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
