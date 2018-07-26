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

  setProperties (element) {
    const attrs = extractor.extractAttribute(element.dataset['octopus'])
    const allowStyle = ['color', 'fontSize', 'width', 'height']
    const filterStyle = (propStyle) => {
      return Object.keys(propStyle).filter(key => allowStyle.includes(key)).reduce((obj, key) => {
        obj[key] = propStyle[key]
        return obj
      }, {})
    }

    if (element.classList.value.indexOf('octopus_') === -1) {
      element.classList.add(`octopus_${this.uniqueID()}`)
    }

    window.$nuxt.$store.commit('SET_PROPERTIES', {
      type: attrs.type,
      payload: {
        element: element.classList[1],
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
        item.addEventListener('click', () => {
          this.setProperties(item)
        }, false)
      }
    })

    element.querySelector('.toolbar_delete').addEventListener('click', () => {
      element.parentNode.removeChild(element)
    }, false)
  }

  start () {
    const BuilderElement = document.querySelector('.builder-element')
    const StudioInner = document.querySelector('.studio-inner')

    Sortable.create(StudioInner, {
      sort: true,
      draggable: '.studio-component',
      handle: '.toolbar_handle',
      group: {
        name: 'advanced',
        pull: false,
        put: true
      },
      animation: 150,
      onAdd: (evt) => {
        const wrapper = evt.item.querySelector('.builder-component')
        const element = evt.item.querySelector('.builder-component section')

        wrapper.classList.remove('builder-component')
        wrapper.classList.add('studio-component')
        wrapper.insertAdjacentHTML('beforeend', `
          <div class="studio-toolbar">
            <span class="studio-toolbar_item toolbar_handle">
              <i class="ion-arrow-move"></i>
            </span>
            <span class="studio-toolbar_item toolbar_delete">
              <i class="ion-trash-b"></i>
            </span>
          </div>
        `)

        evt.item.parentNode.replaceChild(wrapper, evt.item)
        this.setListener(wrapper)
      }
    })

    Sortable.create(BuilderElement, {
      sort: false,
      draggable: '.builder-item',
      group: {
        name: 'advanced',
        pull: 'clone',
        put: false
      },
      animation: 150
    })
  }
}

export default Builder
