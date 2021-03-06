/* eslint-disable */
import Sortable from 'sortablejs'
import extractor from './extractor.js'

class Builder {
  constructor (fromImport) {
    if (!fromImport) {
      this.start()
    }
  }

  uniqueID () {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return `${S4() + S4()}`
  }

  setProperties (parent, element) {
    const attrs = extractor.extractAttribute(element.dataset)
    const allowStyle = [
      'color',
      'fontSize',
      'textAlign',
      'width',
      'height',
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
      'transform'
    ]
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
        tag: element.nodeName,
        element: getClass(element.classList.value),
        option: attrs,
        content: extractor.generatePropsValue(element, attrs.type),
        style: JSON.stringify(filterStyle(window.getComputedStyle(element)))
      }
    })
  }

  setTrigger (element) {
    const parent = element.parentNode

    parent.querySelector('.studio-toolbar_delete').addEventListener('click', () => {
      parent.parentNode.removeChild(parent)
    }, false)
  }

  setListener (element) {
    element.querySelectorAll('[data-o-component]').forEach(parent => {
      parent.childNodes.forEach(item => {
        if (item.dataset.oType) {
          if (item.dataset.oType === 'text') {
            item.setAttribute('contenteditable', true)
          }
  
          if (element.classList.value.indexOf('octopus_') === -1) {
            item.classList.add(`octopus_${this.uniqueID()}`)
          }
  
          item.addEventListener('click', () => {
            document.querySelectorAll('.octopus_active').forEach(actived => {
              actived.classList.remove('octopus_active')
            })
            element.classList.add('octopus_active')
            this.setProperties(item.parentNode, item)
          }, false)
        }
      })
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
        if (element.dataset.oProperty === 'row') {
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
        
        if (element.dataset.oProperty === 'row') {
          this.setTrigger(element)
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
      animation: 150,
      onStart: () => {
        const emptySpace = document.querySelector('.studio-empty')
        if (emptySpace) {
          emptySpace.remove()
        }
      }
    })
  }
}

export default Builder
