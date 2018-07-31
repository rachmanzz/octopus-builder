<template>
  <div class="content content-editor">
    <Navbar :data="navbar" :refresh="refresh" :save="save"/>
    <div class="content-flex">
      <div class="studio">
        <div class="studio-inner"></div>
      </div>
      <div class="properties">
        <b-tabs v-model="tabStep">
          <b-tab title="Layout" active>
            <div class="studio-element">
              <div class="studio-source" v-for="(item, key) in source" :key="key">
                <div class="studio-icon" :class="item.icon" :title="item.name"></div>
                <div class="studio-name">{{ convertText(item.name) }}</div>
                <div class="studio-component">
                  <component :is="item.component" :title="item.name"></component>
                </div>
              </div>
            </div>
          </b-tab>
          <b-tab title="Design">
            <Properties />
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Builder from '~/server/studio/builder.js'
import Extractor from '~/server/studio/extractor.js'
import Importer from '~/server/studio/importer.js'
import Source from '~/server/studio/source.js'
import Navbar from '~/components/global/Navbar.vue'
import Properties from '~/components/studio/Properties.vue'

export default {
  components: {
    Navbar,
    Properties
  },
  data () {
    return {
      navbar: {
        title: 'Studio',
        save: true,
        refresh: true
      },
      source: [],
      target: [],
      tabStep: 0,
      page: {}
    }
  },
  mounted () {
    this.source = Source
    this.page = this.$store.state.page

    if (!this.page['pages']) {
      this.$router.push(`/studio`)
    } else {
      if (process.browser) {
        new Builder() // eslint-disable-line
      }

      setTimeout(() => {
        Importer.generate(JSON.parse(this.page['pages'])).then(result => {
          console.log(result)
          if (result) {
            this.$snotify.success('Generate page success')
          }
        })
      }, 2000)
    }
  },
  methods: {
    save () {
      Extractor.generate().then(mapping => {
        this.page['pages'] = JSON.stringify(mapping)

        axios.put(`/core/page`, this.page).then(res => {
          this.$snotify.success('Save page success')
          this.$router.push(`/studio`)
        })
      })
    },
    refresh () {
      axios.get('/core/component/source').then(res => {
        this.$snotify.success('Mapping new components success')
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
    },
    convertText (string) {
      if (!string) {
        return
      }

      return string.replace(/([A-Z]+)/g, ' $1').replace(/^ /, '').trim()
    }
  },
  computed: {
    properties () {
      return this.$store.state.properties['type']
    }
  },
  watch: {
    properties (newValue, oldValue) {
      this.tabStep = 1
    }
  }
}
</script>