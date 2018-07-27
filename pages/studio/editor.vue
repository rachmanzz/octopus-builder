<template>
  <div class="content">
    <Navbar :data="navbar" :refresh="refresh" :save="save"/>
    <div class="content-flex">
      <div class="studio">
        <!-- <div class="studio-inner"></div> -->

<div class="studio-inner"><div class="studio-canvas" style=""><section data-octopus="component:Images|attr:data|prop:image" class="image"><img data-octopus="attr:image|type:image" src="https://dummyimage.com/1200x400/234bcd/fff" alt="Image" draggable="false"></section>
          <div class="studio-toolbar">
            <span class="studio-toolbar_item studio-toolbar_handle">
              <i class="ion-arrow-move"></i>
            </span>
            <span class="studio-toolbar_item studio-toolbar_delete">
              <i class="ion-trash-b"></i>
            </span>
          </div>
        </div><div class="studio-canvas"><section data-octopus="component:Tagline|attr:data|prop:tagline" class="tagline"><div data-octopus="attr:title|type:text" class="tagline-title octopus_745fb965" contenteditable="true">
    Title Will Be Here</div><div data-octopus="attr:description|type:text" class="tagline-description" contenteditable="true">
    Write Description Here
  </div></section>
          <div class="studio-toolbar">
            <span class="studio-toolbar_item studio-toolbar_handle">
              <i class="ion-arrow-move"></i>
            </span>
            <span class="studio-toolbar_item studio-toolbar_delete">
              <i class="ion-trash-b"></i>
            </span>
          </div>
        </div><div class="studio-canvas studio-canvas_layout" style=""><section data-octopus="component:ThreeColumn|type:column" class="row octopus_4dd6fc1e"><div data-octopus="attr:column|type:4" class="column-wrapper col-4 octopus_4d9c9052"><div class="column-inner"><div class="studio-canvas" style="" draggable="false"><section data-octopus="component:Images|attr:data|prop:image" class="image"><img data-octopus="attr:image|type:image" src="https://dummyimage.com/1200x400/234bcd/fff" alt="Image" draggable="false"></section>
          <div class="studio-toolbar">
            <span class="studio-toolbar_item studio-toolbar_handle">
              <i class="ion-arrow-move"></i>
            </span>
            <span class="studio-toolbar_item studio-toolbar_delete">
              <i class="ion-trash-b"></i>
            </span>
          </div>
        </div><div class="studio-canvas" style=""><section data-octopus="component:Tagline|attr:data|prop:tagline" class="tagline"><div data-octopus="attr:title|type:text" class="tagline-title octopus_9429876b" contenteditable="true">
    Service 1</div><div data-octopus="attr:description|type:text" class="tagline-description" contenteditable="true">
    Write Description Here
  </div></section>
          <div class="studio-toolbar">
            <span class="studio-toolbar_item studio-toolbar_handle">
              <i class="ion-arrow-move"></i>
            </span>
            <span class="studio-toolbar_item studio-toolbar_delete">
              <i class="ion-trash-b"></i>
            </span>
          </div>
        </div></div></div><div data-octopus="attr:column|type:4" class="column-wrapper col-4 octopus_6071fb13"><div class="column-inner"><div class="studio-canvas" style="" draggable="false"><section data-octopus="component:Images|attr:data|prop:image" class="image"><img data-octopus="attr:image|type:image" src="https://dummyimage.com/1200x400/234bcd/fff" alt="Image" draggable="false"></section>
          <div class="studio-toolbar">
            <span class="studio-toolbar_item studio-toolbar_handle">
              <i class="ion-arrow-move"></i>
            </span>
            <span class="studio-toolbar_item studio-toolbar_delete">
              <i class="ion-trash-b"></i>
            </span>
          </div>
        </div><div class="studio-canvas" style=""><section data-octopus="component:Tagline|attr:data|prop:tagline" class="tagline"><div data-octopus="attr:title|type:text" class="tagline-title octopus_377e6f16" contenteditable="true">
    Service 2</div><div data-octopus="attr:description|type:text" class="tagline-description" contenteditable="true">
    Write Description Here
  </div></section>
          <div class="studio-toolbar">
            <span class="studio-toolbar_item studio-toolbar_handle">
              <i class="ion-arrow-move"></i>
            </span>
            <span class="studio-toolbar_item studio-toolbar_delete">
              <i class="ion-trash-b"></i>
            </span>
          </div>
        </div></div></div><div data-octopus="attr:column|type:4" class="column-wrapper col-4 octopus_9a4adc9a"><div class="column-inner"><div class="studio-canvas" style=""><section data-octopus="component:Images|attr:data|prop:image" class="image"><img data-octopus="attr:image|type:image" src="https://dummyimage.com/1200x400/234bcd/fff" alt="Image" draggable="false"></section>
          <div class="studio-toolbar">
            <span class="studio-toolbar_item studio-toolbar_handle">
              <i class="ion-arrow-move"></i>
            </span>
            <span class="studio-toolbar_item studio-toolbar_delete">
              <i class="ion-trash-b"></i>
            </span>
          </div>
        </div><div class="studio-canvas" draggable="false" style=""><section data-octopus="component:Tagline|attr:data|prop:tagline" class="tagline"><div data-octopus="attr:title|type:text" class="tagline-title octopus_b8847f58" contenteditable="true">
    Service 3</div><div data-octopus="attr:description|type:text" class="tagline-description" contenteditable="true">
    Write Description Here
  </div></section>
          <div class="studio-toolbar">
            <span class="studio-toolbar_item studio-toolbar_handle">
              <i class="ion-arrow-move"></i>
            </span>
            <span class="studio-toolbar_item studio-toolbar_delete">
              <i class="ion-trash-b"></i>
            </span>
          </div>
        </div></div></div></section>
          <div class="studio-toolbar">
            <span class="studio-toolbar_item studio-toolbar_handle">
              <i class="ion-arrow-move"></i>
            </span>
            <span class="studio-toolbar_item studio-toolbar_delete">
              <i class="ion-trash-b"></i>
            </span>
          </div>
        </div><div class="studio-canvas"><section data-octopus="component:Button|attr:data|prop:button" class="button"><button data-octopus="attr:title|type:text" class="btn btn-primary octopus_ac87a3db" contenteditable="true">Download</button></section>
          <div class="studio-toolbar">
            <span class="studio-toolbar_item studio-toolbar_handle">
              <i class="ion-arrow-move"></i>
            </span>
            <span class="studio-toolbar_item studio-toolbar_delete">
              <i class="ion-trash-b"></i>
            </span>
          </div>
        </div><div class="studio-canvas studio-canvas_layout" style=""><section data-octopus="component:TwoColumn|type:column" class="row"><div data-octopus="attr:column|type:6" class="column-wrapper col-6"><div class="column-inner"><div class="studio-canvas"><section data-octopus="component:Images|attr:data|prop:image" class="image"><img data-octopus="attr:image|type:image" src="https://dummyimage.com/1200x400/234bcd/fff" alt="Image" draggable="false"></section>
          <div class="studio-toolbar">
            <span class="studio-toolbar_item studio-toolbar_handle">
              <i class="ion-arrow-move"></i>
            </span>
            <span class="studio-toolbar_item studio-toolbar_delete">
              <i class="ion-trash-b"></i>
            </span>
          </div>
        </div></div></div><div data-octopus="attr:column|type:6" class="column-wrapper col-6"><div class="column-inner"><div class="studio-canvas"><section data-octopus="component:Images|attr:data|prop:image" class="image"><img data-octopus="attr:image|type:image" src="https://dummyimage.com/1200x400/234bcd/fff" alt="Image" draggable="false"></section>
          <div class="studio-toolbar">
            <span class="studio-toolbar_item studio-toolbar_handle">
              <i class="ion-arrow-move"></i>
            </span>
            <span class="studio-toolbar_item studio-toolbar_delete">
              <i class="ion-trash-b"></i>
            </span>
          </div>
        </div></div></div></section>
          <div class="studio-toolbar">
            <span class="studio-toolbar_item studio-toolbar_handle">
              <i class="ion-arrow-move"></i>
            </span>
            <span class="studio-toolbar_item studio-toolbar_delete">
              <i class="ion-trash-b"></i>
            </span>
          </div>
        </div><div class="studio-canvas"><section data-octopus="component:Tagline|attr:data|prop:tagline" class="tagline"><div data-octopus="attr:title|type:text" class="tagline-title octopus_07fe5875" contenteditable="true">Foot Note</div><div data-octopus="attr:description|type:text" class="tagline-description" contenteditable="true">
    Write Description Here
  </div></section>
          <div class="studio-toolbar">
            <span class="studio-toolbar_item studio-toolbar_handle">
              <i class="ion-arrow-move"></i>
            </span>
            <span class="studio-toolbar_item studio-toolbar_delete">
              <i class="ion-trash-b"></i>
            </span>
          </div>
        </div></div>

      </div>
      <div class="properties" role="tablist">
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
            <b-card-body class="studio-element">
              <div class="studio-source" v-for="(item, key) in source" :key="key">
                <div class="studio-icon" :class="item.icon" :title="item.name"></div>
                <div class="studio-name">{{ item.name }}</div>
                <div class="studio-component">
                  <component :is="item.component"></component>
                </div>
              </div>
            </b-card-body>
          </b-collapse>
        </b-card>

        <!-- Properties -->
        <Properties />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Builder from '~/lib/studioBuilder.js'
import Source from '~/lib/studioSource.js'
import Extractor from '~/lib/studioExtractor.js'
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
      target: []
    }
  },
  mounted () {
    this.source = Source

    if (process.browser) {
      new Builder() // eslint-disable-line

      Extractor.generateMap().then(mapping => {
        console.log(JSON.stringify(mapping))
        // console.log(mapping)
      })
    }
  },
  methods: {
    save () {
      Extractor.generateMap().then(mapping => {
        console.log(JSON.stringify(mapping))
        // axios.post('/api/render', mapping).then(result => {
        //   this.$snotify.success('Generate page success')
        // })
      })
    },
    refresh () {
      axios.get('/api/component/map').then(res => {
        this.$snotify.success('Mapping new components success')
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
    }
  }
}
</script>