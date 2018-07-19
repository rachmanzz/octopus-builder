<template>
  <div class="content">
    <Navbar :data="navbar"/>
    <div class="content-flex">
      <div class="studio">
        <div class="studio-inner">
          <Container
            group-name="studio"
            :get-child-payload="targetElement"
            :drag-handle-selector="`.toolbar_handle`"
            drag-class="smooth-dnd-drag"
            drop-class="smooth-dnd-drop"
            @drop="onDrop('target', $event)"
            @drag="onDrag('target', $event)"
          >
            <Draggable v-for="(item, key) in target" :key="key">
              <div class="component-item" @click="setEditable(key)">
                <div class="component-toolbar">
                  <span class="component-toolbar_item toolbar_handle">
                    <i class="ion-arrow-move"></i>
                  </span>
                  <span class="component-toolbar_item toolbar_delete" @click="removeComponent(key)">
                    <i class="ion-trash-b"></i>
                  </span>
                </div>
                <component :is="item.component"/>
              </div>
            </Draggable>
          </Container>
        </div>
      </div>
      <div class="properties">
        <div role="tablist">
          <b-card no-body>
            <b-card-header header-tag="header" role="tab" v-b-toggle.accordion1>
              Layouts
            </b-card-header>
            <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <Container
                  :behaviour="'copy'"
                  group-name="studio"
                  :get-child-payload="sourceElement"
                  drag-class="smooth-dnd-drag"
                  drop-class="smooth-dnd-drop"
                >
                  <Draggable v-for="item in source" :key="item.id">
                    <div class="smooth-dnd-item">
                      {{item.data}}
                    </div>
                  </Draggable>
                </Container>
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-card no-body>
            <b-card-header header-tag="header" role="tab" v-b-toggle.accordion2>
              Components
            </b-card-header>
            <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <p class="card-text">
                  Beatae et eos minus nulla sint inventore, repellat quidem, reiciendis hic adipisci quod laudantium odio voluptate modi a. Debitis dignissimos nostrum voluptatem.
                </p>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    Container,
    Draggable,
    Navbar
  },
  data () {
    return {
      navbar: {
        title: 'Studio'
      },
      source: [{
        data: 'Banner',
        component: () => import('~/core/global/Banner.vue')
      }, {
        data: 'Tagline',
        component: () => import('~/core/global/Tagline.vue')
      }, {
        data: 'Counter',
        component: () => import('~/core/global/Counter.vue')
      }],
      target: []
    }
  },
  methods: {
    removeComponent (index) {
      this.target.splice(index, 1)
    },
    onDrop (collection, dropResult) {
      this[collection] = this.applyDrag(this[collection], dropResult)
    },
    setEditable (index) {
      const component = document.querySelectorAll('.component-item')

      component.forEach(item => item.classList.remove('component-item_active'))
      component[index].classList.add('component-item_active')

      document.querySelectorAll('.component-item [data-oct-text]').forEach(item => item.setAttribute('contenteditable', true))
    },
    sourceElement (index) {
      return this.source[index]
    },
    targetElement (index) {
      return this.target[index]
    },
    applyDrag (arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult
      if (removedIndex === null && addedIndex === null) return arr

      const result = [...arr]
      let itemToAdd = payload

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
      }

      return result
    }
  }
}
</script>