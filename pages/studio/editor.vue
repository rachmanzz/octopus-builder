<template>
  <section>
    <div class="content">
      <div class="content-flex">
        <div class="studio" v-loading="loading">
          <div class="studio-inner">
            <div v-if="empty" class="studio-empty">
              Create your page here, drag layout on sidebar to this area.
            </div>
          </div>
        </div>
        <div class="properties">
          <el-row style="margin: 20px;" type="flex" class="row-bg">
            <el-col align="center">
              <el-button type="primary" plain @click="handleRefresh">Refresh Layout</el-button>
              <el-button type="success" plain @click="handleSave">Save Page</el-button>
            </el-col>
          </el-row>
          <el-tabs v-model="activeTab" type="border-card">
            <el-tab-pane name="general">
              <span slot="label"><i class="el-icon-edit-outline"></i> General</span>
              <General :page="page"/>
            </el-tab-pane>
            <el-tab-pane name="layout">
              <span slot="label"><i class="el-icon-news"></i> Layout</span>
              <div class="studio-element">
                <el-card shadow="never" class="studio-source" v-for="(item, key) in source" :key="key">
                  <div class="studio-icon" :class="item.icon" :title="item.name"></div>
                  <div class="studio-name">{{ formatText(item.name) }}</div>
                  <div class="studio-component">
                    <component :is="item.component" :title="item.name"></component>
                  </div>
                </el-card>
              </div>
            </el-tab-pane>
            <el-tab-pane name="design">
              <span slot="label"><i class="el-icon-edit"></i> Design</span>
              <Properties />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import Builder from '~/server/studio/builder.js'
import Extractor from '~/server/studio/extractor.js'
import Importer from '~/server/studio/importer.js'
import Source from '~/server/studio/source.js'
import General from '~/components/studio/General.vue'
import Properties from '~/components/studio/Properties.vue'

export default {
  head: {
    title: 'Editor - Octopus Builder',
    bodyAttrs: {
      class: 'content-editor'
    }
  },
  components: {
    Properties,
    General
  },
  data () {
    return {
      empty: true,
      loading: true,
      navbar: {
        title: 'Studio',
        save: true,
        publish: true,
        refresh: true
      },
      source: [],
      target: [],
      activeTab: 'general',
      page: {}
    }
  },
  mounted () {
    this.$store.commit('SET_COLLAPSE', true)
    this.source = Source
    this.page = this.$store.state.page

    if (this.page['meta']) {
      this.page['meta'] = JSON.parse(this.page['meta'])
    }

    if (!this.page['pages']) {
      this.$router.push(`/studio`)
    } else {
      this.$store.commit('SET_TITLE', this.page['name'])

      if (process.browser) {
        new Builder() // eslint-disable-line
      }

      if (!JSON.parse(this.page['pages'])['path']) {
        this.loading = false
      } else {
        this.empty = false
        setTimeout(() => {
          Importer.generate(JSON.parse(this.page['pages'])).then(result => {
            if (result) {
              this.$message({
                message: 'Generate page success',
                type: 'success'
              })
              this.loading = false
            }
          })
        }, 1500)
      }
    }
  },
  methods: {
    handleSave () {
      Extractor.generate(this.page).then(mapping => {
        this.page['meta'] = JSON.stringify(this.page['meta'])
        this.page['pages'] = JSON.stringify(mapping)

        axios.put('/core/page', this.page).then(res => {
          this.$message({
            message: 'Save page success',
            type: 'success'
          })
          this.$router.push(`/studio`)
        })
      })
    },
    handleRefresh () {
      axios.get('/core/component/source').then(res => {
        this.$message({
          message: 'Mapping new components success',
          type: 'success'
        })
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
    },
    formatText (string) {
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
      this.activeTab = 'design'
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('SET_COLLAPSE', false)
    next()
  }
}
</script>

