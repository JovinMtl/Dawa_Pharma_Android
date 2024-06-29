<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1s</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="page1Container" style="width: 100%; height: 100%; overflow: hidden;">
         <div class="content1" style="background-color: greenyellow; width: 100%; height: 4px">
          <div class="element1"></div>
         </div>
         <div class="content2" style="background-color: grey; width: 100%; height: 98%; font-weight: 700;">
          <div class="element1" style="display: flex;width: 100%; height: 25px">
            <div class="elem1" style="width: 30%; height: 100%; border: 1px solid black; color: #000;">
              Médicament
            </div>
            <div class="elem2" style="width: 10%; height: 100%; border: 1px solid black; color: #000;">
              Qte
            </div>
            <div class="elem3" style="width: 20%; height: 100%; border: 1px solid black; color: #000;">
              Px.A
            </div>
            <div class="elem4" style="width: 20%; height: 100%; border: 1px solid black; color: #000;">
              Px.V
            </div>
            <div class="elem5" style="width: 20%; height: 100%; border: 1px solid black; color: #000;">
              Bénéf
            </div>
          </div>

          <div class="element2" style="background-color: white; width: 100%; height: 91%; 
            color: #000;overflow: auto;">
            <div v-for="med in disponible" class="element1" style="display: flex;width: 100%; height: 25px;
                 ">
              <div class="elem1" style="width: 30%; height: 100%; border: 1px solid black; color: #000;">
                {{ (med.name_umuti).slice(0,8) }}
              </div>
              <div class="elem2" style="width: 10%; height: 100%; border: 1px solid black; color: #000;">
                {{ med.quantite_restant }}
              </div>
              <div class="elem3" style="width: 20%; height: 100%; border: 1px solid black; color: #000;">
                {{ med.price_in }}
              </div>
              <div class="elem4" style="width: 20%; height: 100%; border: 1px solid black; color: #000;">
                {{ med.price_out }}
              </div>
              <div class="elem5" style="width: 20%; height: 100%; border: 1px solid black; color: #000;">
                {{ (Number(med.price_out) - Number(med.price_in)) * (Number(med.quantite_restant)) }}
              </div>
            </div>
          </div>

          <div class="element2" style="width: 100%; height: 5%; color: #000;">
            <div class="element1" style="display: flex;width: 100%; height: 25px; text-align: center;">
              <div class="elem1" style="width: 30%; height: 100%; border: 1px solid black; color: #000;">
                Total
              </div>
              <div class="elem2" style="width: 10%; height: 100%; border: 1px solid black; color: #000;">
                {{ qte_t }}
              </div>
              <div class="elem3" style="width: 20%; height: 100%; border: 1px solid black; color: #000;">
                {{ pa_t }}
              </div>
              <div class="elem4" style="width: 20%; height: 100%; border: 1px solid black; color: #000;">
                {{ pv_t }}
              </div>
              <div class="elem5" style="width: 20%; height: 100%; border: 1px solid black; color: #000;">
                {{ ben_t }}
              </div>
            </div>
          </div>
         </div>
         <div class="content3" style="background-color: greenyellow; width: 100%; height: 4px"></div>
      </div>
      
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { useKuvoma } from '../hooks/kuvoma.js'

const disponible = ref(null)
const totaux = ref(null)
const qte_t = ref(0)
const pa_t = ref(0)
const pv_t = ref(0)
const ben_t = ref(0)

const url_kuvoma = 'api/out/dispo/'
const [dispo, kuvoma_function] = useKuvoma(url_kuvoma)

const totaux_function = ()=>{
  let qte = 0
  let pa = 0
  let pv = 0

  disponible.value.forEach(element => {
    qte += element.quantite_restant
    pa += element.price_in * element.quantite_restant
    pv += element.price_out * element.quantite_restant
  });

  qte_t.value = qte
  pa_t.value = pa
  pv_t.value = pv
  ben_t.value = pv - pa
}

onMounted(()=>{
  kuvoma_function()
})

watch(dispo, (value)=>{
  console.log("Dispo changed into :", value)
  disponible.value = value
  totaux_function()
})
</script>

<style scoped>

</style>