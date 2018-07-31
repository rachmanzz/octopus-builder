import Builder from './builder'
import extractor from './extractor.js'

const engine = new Builder(true)

const generate = async (sources) => {
  const container = document.querySelector('.studio-inner')
  const source = sources['components']

  source.map(item => {
    const wrapper = document.createElement('div')
    let element = document.querySelector(`section[title="${item.name}"]`)

    wrapper.className = 'studio-canvas'
    wrapper.appendChild(element.cloneNode(true))
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
    engine.setListener(wrapper)

    element = container.querySelector(`section[title="${item.name}"]`)

    if (item.props) {
      const payload = item.props['payload']
      Object.keys(payload).forEach(key => {
        element.querySelectorAll('[data-octopus]').forEach(item => {
          const attrs = extractor.extractAttribute(item.dataset['octopus'])

          if (attrs['attr'] === key) {
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
        element.querySelectorAll('[data-octopus]').forEach(item => {
          if (item.classList.value.indexOf(key) > -1) {
            Object.keys(styles[key]).forEach(property => {
              item.style[property] = styles[key][property]
            })
          }
        })
      })
    }
  })

  return []
}

export default {
  generate
}
