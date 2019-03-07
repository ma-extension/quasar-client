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
      @clickReader="(e) => clickReader(e)"
      @transition="updatePanels"
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
      maintitle: 'Manga Agenda Extension',
      parentPanel: '',
      panel: 'readers',
      parent: {},
      mae_panels: null
    }
  },
  computed: {
    title () {
      if (this.isHomePanel()) {
        return this.maintitle
      }
      return this.parent.title
    }
  },
  mounted () {
    this.mae_panels = document.querySelector('#mae_panels')
  },
  methods: {
    updatePanels (value) {
      this.panel = value.new_panel
      this.parentPanel = value.old_panel
    },
    clickReader (element) {
      // this.parentPanel = element.parentPanel
      this.panel = element.panel
      this.parent = element
    },
    backPanel () {
      this.mae_panels = document.querySelector('#mae_panels')
      // this.panel = this.parentPanel
      // console.dir(this.mae_panels)
      this.mae_panels.__vue__.previous()
    },
    isHomePanel () {
      return (this.panel === 'readers') ? true : false
    }
  }
}
</script>
