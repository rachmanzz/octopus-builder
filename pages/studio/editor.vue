<template>
  <div class="content">
    <Navbar :data="navbar" :refresh="refresh" :save="save"/>
    <div class="content-flex">
      <div class="studio">
        <div class="studio-inner">

          <!-- Studio Workspace -->
          <Container
            group-name="studio"
            :get-child-payload="setTarget"
            :drag-handle-selector="`.toolbar_handle`"
            drag-class="smooth-dnd-drag"
            drop-class="smooth-dnd-drop"
            @drop="studioDrop('target', $event)"
          >
            <Draggable v-for="(item, key) in target" :key="key">
              <div class="component-item" @click="setProperties(key)">
                <div class="component-toolbar">
                  <span class="component-toolbar_item toolbar_handle">
                    <i class="ion-arrow-move"></i>
                  </span>
                  <span class="component-toolbar_item toolbar_delete" @click="studioRemove(key)">
                    <i class="ion-trash-b"></i>
                  </span>
                </div>
                <component :is="item.component"></component>
              </div>
            </Draggable>
          </Container>

        </div>
      </div>
      <div class="properties">
        <div role="tablist">

          <!-- Layouts -->
          <b-card class="card-default" no-body>
            <b-card-header header-tag="header" role="tab" v-b-toggle.layouts>
              Layouts
            </b-card-header>
            <b-collapse id="layouts" accordion="editor-collapse" role="tabpanel">
              <b-card-body>
                no layout
              </b-card-body>
            </b-collapse>
          </b-card>

          <!-- Components -->
          <b-card class="card-default" no-body>
            <b-card-header header-tag="header" role="tab" v-b-toggle.components>
              Components
            </b-card-header>
            <b-collapse id="components" visible accordion="editor-collapse" role="tabpanel">
              <b-card-body>
                <Container
                  :behaviour="'copy'"
                  group-name="studio"
                  :get-child-payload="setSource"
                  drag-class="smooth-dnd-drag"
                  drop-class="smooth-dnd-drop"
                >
                  <Draggable v-for="item in source" :key="item.id">
                    <div class="smooth-dnd-item">
                      {{ item.data }}
                    </div>
                  </Draggable>
                </Container>
              </b-card-body>
            </b-collapse>
          </b-card>

          <!-- Properties -->
          <b-card class="card-default" no-body>
            <b-card-header header-tag="header" role="tab" v-b-toggle.properties>
              Properties
            </b-card-header>
            <b-collapse id="properties" accordion="editor-collapse" role="tabpanel">
              <b-card-body>
                Properties
              </b-card-body>
            </b-collapse>
          </b-card>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import builder from '~/lib/studioBuilder.js'
import importer from '~/lib/studioImporter.js'
import extractor from '~/lib/studioExtractor.js'
import Navbar from '~/components/global/Navbar.vue'
import { Container, Draggable } from 'vue-smooth-dnd'

export default {
  components: {
    Container,
    Draggable,
    Navbar
  },
  data () {
    return {
      navbar: {
        title: 'Studio',
        save: true,
        refresh: true
      },
      source: [],
      target: []
    }
  },
  mounted () {
    this.source = importer
  },
  methods: {
    save () {
      extractor().then(mapping => {
        axios.post('/api/render', mapping).then(result => {
          this.$snotify.success('Generate page success')
        })
      })
    },
    refresh () {
      axios.get('/api/component/map').then(res => {
        this.$snotify.success('Mapping new components success')
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
    },
    studioDrop (collection, dropResult) {
      this[collection] = builder.setDrop(this[collection], dropResult)
    },
    studioRemove (index) {
      this.target.splice(index, 1)
    },
    setSource (index) {
      return this.source[index]
    },
    setTarget (index) {
      return this.target[index]
    },
    setProperties (key) {
      return builder.setEditable(key)
    }
  }
}
</script>