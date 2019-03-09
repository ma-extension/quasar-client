<template>
  <q-page id="index" class="">
    <q-header elevated class="bg-red-10">
      <q-toolbar>
        <q-btn
          icon="arrow_back"
          round
          flat
          v-if="!isHomePanel()"
          @click="backPanel()"
        />
        <q-toolbar-title>
          {{ this.title }}
        </q-toolbar-title>

      </q-toolbar>
    </q-header>
    <ListReader
      @panelChange="(e) => updateTitle(e)"
      />
  </q-page>
</template>

<style>
#index {
  width: 300px;
}
</style>

<script>
import ListReader from '../components/ListReader.vue'
export default {
  components: {
    ListReader
  },
  name: 'PageIndex',
  data () {
    return {
      maintitle: '',
      mae_panels: null
    }
  },
  computed: {
    title () {
      if (this.maintitle === '') {
        return 'Manga Agenda Extension'
      }
      return this.maintitle
    }
  },
  mounted () {
    this.mae_panels = document.querySelector('#mae_panels')
  },
  methods: {
    updateTitle (value) {
      this.maintitle = value.title
    },
    backPanel () {
      this.mae_panels = document.querySelector('#mae_panels')
      this.mae_panels.__vue__.previous()
    },
    isHomePanel () {
      return (this.maintitle === '') ? true : false
    }
  }
}
</script>
