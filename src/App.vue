<template>
  <main>
    <form>
      <fieldset>
        <legend>Kutya</legend>
        <label for="customer-name">Név</label>
        <input v-model="personalDetails.customerName" id="customer-name" type="text">
        <label for="customer-zip">Irányítószám</label>
        <input v-model="personalDetails.customerZip" id="customer-zip" type="number">
        <label for="customer-address">Lakcím</label>
        <input v-model="personalDetails.customerAddress" id="customer-address" type="text">
      </fieldset>
      <fieldset>
        <label for="work-details">Mit köll csinálni!</label>
        <input v-model="workDetail" id="work-details" type="text">
        <button @click.prevent="pushWorkDetail">Hozzáad</button>
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
<!--    <div id="element-to-print">-->
<!--      <p>-->
<!--        {{ this.items }}-->
<!--      </p>-->
<!--      <p>-->
<!--        {{ this.workDetails }}-->
<!--      </p>-->
<!--      <p>-->
<!--        {{ materialCost }}-->
<!--      </p>-->
<!--      <p>-->
<!--        {{ totalCost }}-->
<!--      </p>-->
<!--      <p>Kelt:-->
<!--        {{ moment().format('LL') }}-->
<!--      </p>-->
<!--      <p>Ajánlat érvényessége:-->
<!--        {{ moment().add(2, 'weeks').format('LL') }}-->
<!--      </p>-->
<!--      <button @click="htmltopdf('element-to-print')">Teszt</button>-->
<!--    </div>-->
  </main>
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

// const workDetails = ref([])

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



      personalDetails: [
        { customerName: "" },
        { customerZip: "" },
        { customerAddress: "" }
      ],
      workDetails: [],
      items: []
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
      }
    }
  }
}

</script>