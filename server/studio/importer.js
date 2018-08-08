import Builder from './builder'
import extractor from './extractor.js'

const engine = new Builder(true)

const layout = (parent, source) => {
  const column = parent.querySelectorAll('[data-o-property="column"]')
  source.map((item, index) => {
    item['components'].map(item => {
      create(item, column[index].firstChild)
    })
  })
}

const create = (item, root) => {
  const container = root || document.querySelector('.studio-inner')
  const wrapper = document.createElement('div')
  let element = document.querySelector(`section[title="${item.name}"]`).cloneNode(true)

  wrapper.classList.add('studio-canvas')
  element.classList.add(item.class)

  wrapper.appendChild(element)
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

  container.appendChild(wrapper)

  if (element.dataset.oProperty === 'row') {
    wrapper.classList.add('studio-canvas')
    wrapper.classList.add('studio-canvas_layout')

    engine.setTrigger(element)

    element.childNodes.forEach(item => {
      item.innerHTML = '<div class="column-inner"></div>'

      const inner = item.querySelector('.column-inner')

      engine.setLayout(inner)
    })
  } else {
    engine.setListener(wrapper)
  }

  element = container.querySelector(`section[class*="${item.class}"]`)

  if (item.props) {
    const payload = item.props['payload']
    Object.keys(payload).forEach(key => {
      element.querySelectorAll('[data-o-property]').forEach(item => {
        const attrs = extractor.extractAttribute(item.dataset)

        if (attrs['property'] === key) {
          switch (attrs['type']) {
            case 'image':
              item.src = payload[key]
              break

            default:
              item.innerHTML = payload[key]
              break
          }
        }
      })
    })
  }

  if (item.styles) {
    const styles = item.styles
    Object.keys(styles).forEach(key => {
      element.querySelectorAll('[data-o-property]').forEach(item => {
        if (item.classList.value.indexOf(key) > -1) {
          Object.keys(styles[key]).forEach(property => {
            item.style[property] = styles[key][property]
          })
        }
      })
    })
  }

  if (item.rows) {
    layout(document.querySelector(`[class*="${item.class}"]`), item.rows)
  }
}

const generate = async (sources) => {
  const source = sources['components']

  source.map(item => {
    create(item)
  })

  return []
}

export default {
  generate
}
