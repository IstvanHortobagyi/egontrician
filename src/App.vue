<template>
	<!-- TODO:
		- PDF margók (https://ekoopmans.github.io/html2pdf.js/#usage)
			- index osztható 10-el (példa)
			- Pdf custom nevek
		- Settings screent bekötni
		- Home oldalon be kell kötni az Új Árajánlat gombot
		- Kell egy kapcsoló az árajánlathoz, hogy ki lett küldve
		- Vue Router
			- Menü képernyő
				- Listázza a meglévő ajánlatokat
				- Új ajánlat készítése gomb
			- Beállítások képernyő
				- Állandó adatok szerkesztése
				- Bármilyen app setting?
			- Create/Edit képernyő
				- Create-nél lenullázni a mezőket
		- [v2.0] Splash screen a legelején (~1500ms)
		- Adószám mask
		- pinia store
	-->
	<section class="section section--input">
		<header class="menu">
			<a @click.prevent="toggleMenu()" class="menu__link" href="#"><span class="text-yellow">M</span>enü</a>
			<div v-if="menuOpen" class="dropdown-container">
				<ul class="dropdown">
					<RouterLink @click="goToPage('Home')" class="menu__link dropdown__link" to="/Home" ><span class="text-yellow">A</span>jánlatok</RouterLink>
					<RouterLink @click="goToPage('CreateEdit')" class="menu__link dropdown__link" to="/" ><span class="text-yellow">Ú</span>j Árajánlat</RouterLink>
					<hr class="hr--black">
					<RouterLink @click="goToPage('Settings')" class="menu__link dropdown__link" to="/Settings"><span class="text-yellow">B</span>eállítások</RouterLink>
				</ul>
			</div>
		</header>
		<RouterView v-if="!showCreateEdit" />
		<div v-if="showCreateEdit" class="section__content create-edit">
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
							<label class="label" for="customer-address">Adószám (opcionális):</label>
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
								<input v-model="workDetailsStore.workDetail" @keyup.enter="workDetailsStore.pushWorkDetail()" id="work-details" class="input" type="text">
								<div class="input-background" :style="{width: workDetailsStore.workDetail.length + 1 + 'ch'}"></div>
								<div class="input-caret" :style="{left: workDetailsStore.workDetail.length + 1 + 'ch'}"></div>
							</div>
							<button class="btn btn--small ml-1" @click.prevent="workDetailsStore.pushWorkDetail()" type="button">+</button>
						</div>
					</div>
					<hr v-if="workDetailsStore.workDetails.length">
					<div v-if="workDetailsStore.workDetails.length" class="card__content">
						<table class="table table--input">
							<thead>
								<tr>
									<th>Feladat Neve</th>
									<th>Műveletek</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(work, index) in this.workDetailsStore.workDetails" :key="index">
									<td>
										<div v-if="workDetailsStore.isEditingWork[index]" class="input-container">
											<input v-model="workDetailsStore.workDetails[index]" @keyup.enter="toggleEdit(index, 'Work')" class="input" type="text">
											<div class="input-background" :style="{width: workDetailsStore.workDetails[index].length + 1 + 'ch'}"></div>
											<div class="input-caret" :style="{left: workDetailsStore.workDetails[index].length + 1 + 'ch'}"></div>
										</div>
										<span v-else>{{ work }}</span>
									</td>
									<td>
										<button class="text-button" @click.prevent="toggleEdit(index, 'Work')" type="button">{{workDetailsStore.isEditingWork[index] ? "[Mentés]" : "[Szerkesztés]"}}</button>
										<button class="text-button" @click.prevent="workDetailsStore.removeWork(index)" type="button">[Törlés]</button>
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
								<input v-model="materialStore.itemName" @keyup.enter="materialStore.pushItem()" id="item-name" class="input" type="text">
								<div class="input-background" :style="{width: materialStore.itemName.length + 1 + 'ch'}"></div>
								<div class="input-caret" :style="{left: materialStore.itemName.length + 1 + 'ch'}"></div>
							</div>
						</div>
						<div class="form-group">
							<label class="label" for="item-quantity">Mennyiség:</label>
							<div class="input-container">
								<input v-model.number="materialStore.itemQuantity" @keyup.enter="pushItem()" id="item-quantity" class="input" type="number">
								<div class="input-background" :style="{width: materialStore.itemQuantity.toString().length + 1 + 'ch'}"></div>
								<div class="input-caret" :style="{left: materialStore.itemQuantity.toString().length + 1 + 'ch'}"></div>
							</div>
						</div>
						<div class="form-group">
							<div class="radbox">
								<input v-model="materialStore.itemUnit" value="darab" id="radio1" class="radbox__input" type="radio" name="unit">
								<label for="radio1" class="radbox__label">darab</label>
							</div>
							<div class="radbox">
								<input v-model="materialStore.itemUnit" value="méter" id="radio2" class="radbox__input" type="radio" name="unit">
								<label for="radio2" class="radbox__label">méter</label>
							</div>
							<div class="radbox">
								<input v-model="materialStore.itemUnit" value="zsák" id="radio3" class="radbox__input" type="radio" name="unit">
								<label for="radio3" class="radbox__label">zsák</label>
							</div>
							<div class="radbox">
								<input v-model="materialStore.itemUnit" value="csomag" id="radio4" class="radbox__input" type="radio" name="unit">
								<label for="radio4" class="radbox__label">csomag</label>
							</div>
						</div>
						<div class="form-group">
							<label class="label" for="item-price">Egységár:</label>
							<div class="input-container">
								<input v-model.number="materialStore.itemPrice" @keyup.enter="materialStore.pushItem()" id="item-price" class="input" type="number">
								<div class="input-background" :style="{width: materialStore.itemPrice.toString().length + 1 + 'ch'}"></div>
								<div class="input-caret" :style="{left: materialStore.itemPrice.toString().length + 1 + 'ch'}"></div>
							</div>
						</div>
						<button @click.prevent="materialStore.pushItem()" class="btn btn--small" type="button">+</button>
					</div>
					<hr v-if="materialStore.materials.length">
					<div v-if="materialStore.materials.length" class="card__content">
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
								<tr v-for="(item, index) in this.materialStore.materials" :key="index">
									<td>
										<div v-if="materialStore.isEditingMaterial[index]" class="input-container">
											<input v-model="materialStore.materials[index].name" @keyup.enter="toggleEdit(index, 'Material')" class="input" type="text">
											<div class="input-background" :style="{width: materialStore.materials[index].name.length + 1 + 'ch'}"></div>
											<div class="input-caret" :style="{left: materialStore.materials[index].name.length + 1 + 'ch'}"></div>
										</div>
										<span v-else>{{ item.name }}</span>
									</td>
									<td>
										<div v-if="materialStore.isEditingMaterial[index]" class="input-container">
											<input v-model.number="materialStore.materials[index].quantity" @keyup.enter="toggleEdit(index, 'Material')" class="input" type="number">
											<div class="input-background" :style="{width: materialStore.materials[index].quantity.toString().length + 1 + 'ch'}"></div>
											<div class="input-caret" :style="{left: materialStore.materials[index].quantity.toString().length + 1 + 'ch'}"></div>
										</div>
										<span v-else>{{ item.quantity }} {{ item.unit }}</span>
									</td>
									<td>
										<div v-if="materialStore.isEditingMaterial[index]" class="input-container">
											<input v-model.number="materialStore.materials[index].price" @keyup.enter="toggleEdit(index, 'Material')" class="input" type="number">
											<div class="input-background" :style="{width: materialStore.materials[index].price.toString().length + 1 + 'ch'}"></div>
											<div class="input-caret" :style="{left: materialStore.materials[index].price.toString().length + 1 + 'ch'}"></div>
										</div>
										<span v-else>{{ item.price }}</span>
									</td>
									<td>
										<button class="text-button" @click.prevent="toggleEdit(index, 'Material')" type="button">{{materialStore.isEditingMaterial[index] ? "[Mentés]" : "[Szerkesztés]"}}</button>
										<button class="text-button" @click.prevent="materialStore.removeItem(index)" type="button">[Törlés]</button>
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
								<input v-model="ancillaryStore.ancillaryCostName" @keyup.enter="ancillaryStore.pushAncillary()" id="ancillary-cost-name" class="input" type="text">
								<div class="input-background" :style="{width: ancillaryStore.ancillaryCostName.length + 1 + 'ch'}"></div>
								<div class="input-caret" :style="{left: ancillaryStore.ancillaryCostName.length + 1 + 'ch'}"></div>
							</div>
						</div>
						<div class="form-group">
							<label class="label" for="ancillary-cost-price">Ár</label>
							<div class="input-container">
								<input v-model="ancillaryStore.ancillaryCostPrice" @keyup.enter="ancillaryStore.pushAncillary()" id="ancillary-cost-price" class="input" type="number">
								<div class="input-background" :style="{width: ancillaryStore.ancillaryCostPrice.toString().length + 1 + 'ch'}"></div>
								<div class="input-caret" :style="{left: ancillaryStore.ancillaryCostPrice.toString().length + 1 + 'ch'}"></div>
							</div>
						</div>
						<button @click.prevent="ancillaryStore.pushAncillary()" class="btn btn--small" type="button">+</button>
					</div>
					<hr v-if="ancillaryStore.ancillaryCosts.length">
					<div v-if="ancillaryStore.ancillaryCosts.length" class="card__content">
						<table class="table table--input">
							<thead>
								<tr>
									<th>Megnevezés</th>
									<th>Ár</th>
									<th>Műveletek</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(ancillaryCost, index) in this.ancillaryStore.ancillaryCosts" :key="index">
									<td>
										<div v-if="ancillaryStore.isEditingAncillary[index]" class="input-container">
											<input v-model="ancillaryStore.ancillaryCosts[index].name" @keyup.enter="toggleEdit(index, 'Ancillary')" class="input" type="text">
											<div class="input-background" :style="{width: ancillaryStore.ancillaryCosts[index].name.length + 1 + 'ch'}"></div>
											<div class="input-caret" :style="{left: ancillaryStore.ancillaryCosts[index].name.length + 1 + 'ch'}"></div>
										</div>
										<span v-else>{{ ancillaryCost.name }}</span>
									</td>
									<td>
										<div v-if="ancillaryStore.isEditingAncillary[index]" class="input-container">
											<input v-model="ancillaryStore.ancillaryCosts[index].price" @keyup.enter="toggleEdit(index, 'Ancillary')" class="input" type="number">
											<div class="input-background" :style="{width: ancillaryStore.ancillaryCosts[index].price.toString().length + 1 + 'ch'}"></div>
											<div class="input-caret" :style="{left: ancillaryStore.ancillaryCosts[index].price.toString().length + 1 + 'ch'}"></div>
										</div>
										<span v-else>{{ ancillaryCost.price }}</span>
									</td>
									<td>
										<button class="text-button" @click.prevent="toggleEdit(index, 'Ancillary')" type="button">{{ancillaryStore.isEditingAncillary[index] ? "[Mentés]" : "[Szerkesztés]"}}</button>
										<button class="text-button" @click.prevent="ancillaryStore.removeAncillary(index)" type="button">[Törlés]</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</fieldset>
			</form>
			<button @click="htmltopdf('element-to-print')"><span class="text-black">P</span>DF Letöltése</button>
			&nbsp;
			<button @click.prevent=""><span class="text-black">A</span>jánlat Mentése</button>

			<dialog :open="modalState.modalOpen" class="modal">
				<div class="modal-container">
					<h2 class="modal__title">Hiba</h2>
					<p v-for="e in e.errors">A(z) {{ e }} mező kitöltése kötelező.</p>
					<button @click.prevent="modalState.toggleModal()" class="modal__button btn" type="button">Ok</button>
				</div>
			</dialog>
		</div>
	</section>
	<section class="section section--output">
		<div class="paper-bg">
			<div id="element-to-print" class="paper">
				<header class="letterhead">
					<img class="letterhead__logo" src="https://rolandszabo.photo/assets/favicons/apple-touch-icon.png" alt="TODO">
					<div class="letterhead__text">
						<h1 class="h4 letterhead__title">SE-Vill Kft.?</h1>
						<div>Telefon: <a href="tel:+36307331194">+36307331194</a></div>
						<div>Email: <a href="mailto:egon@sevill.hu">egon@sevill.hu</a></div>
					</div>
				</header>
				<section class="parties">
					<div class="party party--left">
						<h2 class="subheading">Ajánlattevő:</h2>
						<div><strong class="h3">Stefán Egon e.v.</strong></div>
						<address class="party__text">2081 Piliscsaba, Ferenc-forrás útja 45.</address>
						<p class="party__text">Adószám: 90289664-1-23</p>
					</div>
					<div class="party party--right">
						<h2 class="subheading">Ajánlatkérő:</h2>
						<div><strong class="h3">{{ personalDetails.customerName ? personalDetails.customerName : "Vevő Neve" }}</strong></div>
						<address class="party__text">
							{{ personalDetails.customerZip ? personalDetails.customerZip : "Irányítószám" }}
							{{ personalDetails.customerCity ? personalDetails.customerCity : "Város" }},
							{{ personalDetails.customerAddress ? personalDetails.customerAddress : "Lakcím" }}
						</address>
						<p class="party__text">{{ personalDetails.customerTaxNumber ? "Adószám: " + personalDetails.customerTaxNumber : "Adószám" }}</p>
					</div>
				</section>

				<div v-if="workDetailsStore.workDetails.length">
					<h2 class="h3">Feladatok:</h2>
					<ul>
						<li v-for="task in this.workDetailsStore.workDetails">{{ task }}</li>
					</ul>
				</div>

				<h3 v-if="ancillaryStore.ancillaryCosts.length || materialStore.materials.length">Költségek:</h3>
				<table class="table table--output">
					<tbody>
						<tr v-if="materialStore.materials.length">
							<td colspan="4">
								<h3 class="subheading mb-0">Anyagköltség:</h3>
							</td>
						</tr>
						<tr v-if="materialStore.materials.length">
							<th>Megnevezés</th>
							<th>Mennyiség</th>
							<th>Egységár</th>
							<th class="text-right">Összesen</th>
						</tr>
						<tr v-if="materialStore.materials.length" v-for="material in this.materialStore.materials">
							<td>{{ material.name }}</td>
							<td>{{ material.quantity }}&nbsp;{{ material.unit }}</td>
							<td>{{ formatNumber(material.price) }}&nbsp;Ft/{{ material.unit }}</td>
							<td class="text-right">{{ formatNumber(material.price * material.quantity) }}&nbsp;Ft</td>
						</tr>
						<tr v-if="materialStore.materials.length" class="subtotal">
							<td colspan="3">Részösszesen:</td>
							<td class="text-right text-dark">
								<strong>{{ formatNumber(materialStore.materialCost) }}&nbsp;Ft</strong>
							</td>
						</tr>
						<tr>
							<td></td>
						</tr>
						<tr v-if="ancillaryStore.ancillaryCosts.length">
							<td colspan="4">
								<h3 class="subheading mb-0">Egyéb Költségek:</h3>
							</td>
						</tr>
						<tr v-if="ancillaryStore.ancillaryCosts.length">
							<th colspan="3">Megnevezés</th>
							<th class="text-right">Összesen</th>
						</tr>
						<tr v-if="ancillaryStore.ancillaryCosts.length" v-for="ancillary in this.ancillaryStore.ancillaryCosts">
							<td colspan="3">{{ ancillary.name }}</td>
							<td class="text-right">{{ formatNumber(ancillary.price) }}&nbsp;Ft</td>
						</tr>
						<tr v-if="ancillaryStore.ancillaryCosts.length" class="subtotal">
							<td colspan="3">Részösszesen:</td>
							<td class="text-right text-dark">
								<strong>{{ formatNumber(ancillaryStore.ancillaryCost) }}&nbsp;Ft</strong>
							</td>
						</tr>
						<tr>
							<td></td>
						</tr>
						<tr>
							<td></td>
						</tr>
						<tr class="table__footer">
							<td colspan="3"><h3 class="mt-0">Végösszeg</h3></td>
							<td class="text-right pr-0">
								<p class="h3 mt-0">{{ formatNumber(totalCost) }}&nbsp;Ft</p>
							</td>
						</tr>
					</tbody>
				</table>

				<p><small>Az ajánlat érvényessége: {{ expirationDate }} <br>Fizetni utólag lehetséges, készpénzzel vagy átutalással, számla ellenében. Az árak bruttó árak, alanyi adómentesek (AAM), és tájékoztató jellegűek.</small></p>
				<p>Kelt: Piliscsaba, {{ currentDate }}</p>
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
import { useClientStore } from "@/stores/clientStore.js";
import { useMaterialStore } from "@/stores/materialStore.js";
import { useErrorStore } from "@/stores/errorStore.js";
import { useDetailsStore } from "@/stores/workDetailsStore.js";
import { useModalStore } from "@/stores/modalStore.js";
import {useAncillaryStore} from "@/stores/ancillaryStore.js";

moment.locale('hu')

window.html2canvas = html2canvas
window.jsPDF = jsPDF

export default {
	data() {
		return {
			modalState: useModalStore(),
			menuOpen: false,
			showCreateEdit: true,


			personalDetails: useClientStore(),

			workDetailsStore: useDetailsStore(),
			materialStore: useMaterialStore(),
			ancillaryStore: useAncillaryStore(),
      currentDate: moment().format('LL'),
      expirationDate: moment().add(2, 'weeks').format('LL'),

			e: useErrorStore()
		}
	},

	methods: {
		toggleEdit(index, list) {
			if (list === "Work") {
				this.workDetailsStore.isEditingWork[index] = !this.workDetailsStore.isEditingWork[index]
			} else if (list === "Material") {
				this.materialStore.isEditingMaterial[index] = !this.materialStore.isEditingMaterial[index]
			} else if (list === "Ancillary") {
				this.ancillaryStore.isEditingAncillary[index] = !this.ancillaryStore.isEditingAncillary[index]
			}
		},

		formatNumber(num) {
			return new Intl.NumberFormat('en-US', {
				useGrouping: true
			}).format(num).replace(/,/g, '\u00a0');
		},

		toggleMenu() {
			this.menuOpen = !this.menuOpen
		},

		goToPage(page) {
			this.toggleMenu();
			if (page === "CreateEdit") {
				this.showCreateEdit = true;
			} else {
				this.$router.push({path: "/" + page})
				this.showCreateEdit = false;
			}
		},

		validateInputs(inputs) {
			this.errors = [];

			Object.keys(inputs).forEach((key) => {
				if (inputs[key] === "") {
					this.errors.push(key)
				}
			})

			return this.errors.length <= 0;
		},

		saveOffer() {

		},

		htmltopdf(element) {
			if (this.validateInputs({"Név" : this.personalDetails.customerName, "Irányítószám" : this.personalDetails.customerZip, "Város" : this.personalDetails.customerCity, "Lakcím": this.personalDetails.customerAddress})){
				html2pdf()
						.set({
							margin: [11, 21, 0, 21],
							filename: 'download.pdf',
							autoPaging: 'text',
							pagebreak: {mode: 'avoid-all'},
							image: { type: 'jpeg', quality: 1 },
							html2canvas: {
								scale: 3,         // ⬅️ Increase to 2 or 3 for sharper text
								useCORS: true     // ⬅️ If you have external images/fonts
							},
							jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
						})
						.from(document.getElementById(element))
						.save();
			} else {
				this.modalState.toggleModal()
			}
		}
	},


	computed: {
		totalCost: {
			get() {
				return this.materialStore.materialCost + this.ancillaryStore.ancillaryCost
			},
			set() {
				return this.materialStore.materialCost + this.ancillaryStore.ancillaryCost
			},
		},
	}
}

</script>
