/* eslint-disable */
import Sortable from 'sortablejs'
import extractor from './studioExtractor.js'

class Builder {
  constructor () {
    this.start()
  }

  uniqueID () {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return `${S4() + S4()}`
  }

  setProperties (parent, element) {
    const attrs = extractor.extractAttribute(element.dataset['octopus'])
    const allowStyle = ['color', 'fontSize', 'width', 'height']
    const filterStyle = (propStyle) => {
      return Object.keys(propStyle).filter(key => allowStyle.includes(key)).reduce((obj, key) => {
        obj[key] = propStyle[key]
        return obj
      }, {})
    }
    const getClass = (classList) => {
      const regClass = /[a-zA-Z0-9\\_\\"]+$/g
      if (classList.match(regClass)) {
        return classList.match(regClass)[0]
      }
    }

    window.$nuxt.$store.commit('SET_PROPERTIES', {
      type: attrs.type,
      payload: {
        element: getClass(element.classList.value),
        option: element.dataset['octopus'],
        content: extractor.generatePropsValue(element, attrs.type),
        style: JSON.stringify(filterStyle(window.getComputedStyle(element))),
        protoStyle: element.dataset['octopusStyle']
      }
    })
  }

  setListener (element) {
    element.querySelectorAll('[data-octopus]').forEach(item => {
      if (item.dataset['octopus'].indexOf('type:') > -1) {
        if (item.dataset['octopus'].indexOf('type:text') > -1) {
          item.setAttribute('contenteditable', true)
        }

        if (element.classList.value.indexOf('octopus_') === -1) {
          item.classList.add(`octopus_${this.uniqueID()}`)
        }

        item.addEventListener('click', () => {
          this.setProperties(item.parentNode, item)
        }, false)
      }
    })

    element.querySelector('.studio-toolbar_delete').addEventListener('click', () => {
      element.parentNode.removeChild(element)
    }, false)
  }

  setLayout (parent) {
    Sortable.create(parent, {
      group: {
        name: 'studio',
        pull: false,
        put: true
      },
      animation: 150,
      onAdd: (evt) => {
        const wrapper = evt.item.querySelector('.studio-component')
        const element = evt.item.querySelector('.studio-component section')

        wrapper.classList.remove('studio-component')
        wrapper.classList.add('studio-canvas')

        if (element.classList.value.indexOf('octopus_') === -1) {
          element.classList.add(`octopus_${this.uniqueID()}`)
        }

        wrapper.insertAdjacentHTML('beforeend', `
          <div class="studio-toolbar">
            <span class="studio-toolbar_item studio-toolbar_handle">
              <i class="ion-arrow-move"></i>
            </span>
            <span class="studio-toolbar_item studio-toolbar_delete">
              <i class="ion-trash-b"></i>
            </span>
          </div>
        `)

        evt.item.parentNode.replaceChild(wrapper, evt.item)
        this.setListener(wrapper)
      }
    })
  }

  start () {
    const BuilderElement = document.querySelector('.studio-element')
    const StudioInner = document.querySelector('.studio-inner')

    Sortable.create(StudioInner, {
      sort: true,
      draggable: '.studio-canvas',
      handle: '.studio-toolbar_handle',
      group: {
        name: 'studio',
        pull: false,
        put: true
      },
      animation: 150,
      onAdd: (evt) => {
        const wrapper = evt.item.querySelector('.studio-component')
        const element = evt.item.querySelector('.studio-component section')

        wrapper.classList.remove('studio-component')
        wrapper.classList.add('studio-canvas')

        if (element.dataset['octopus'].indexOf('column') > -1) {
          wrapper.classList.add('studio-canvas_layout')
        }

        if (element.classList.value.indexOf('octopus_') === -1) {
          element.classList.add(`octopus_${this.uniqueID()}`)
        }

        wrapper.insertAdjacentHTML('beforeend', `
          <div class="studio-toolbar">
            <span class="studio-toolbar_item studio-toolbar_handle">
              <i class="ion-arrow-move"></i>
            </span>
            <span class="studio-toolbar_item studio-toolbar_delete">
              <i class="ion-trash-b"></i>
            </span>
          </div>
        `)

        evt.item.parentNode.replaceChild(wrapper, evt.item)

        if (element.dataset['octopus'].indexOf('column') > -1) {
          element.childNodes.forEach(item => {
            item.innerHTML = '<div class="column-inner"></div>'
            const inner = item.querySelector('.column-inner')
            this.setLayout(inner)
          })
        } else {
          this.setListener(wrapper)
        }
      }
    })

    Sortable.create(BuilderElement, {
      sort: false,
      draggable: '.studio-source',
      group: {
        name: 'studio',
        pull: 'clone',
        put: false
      },
      animation: 150
    })
  }
}

export default Builder
