/* eslint-disable */
import Sortable from 'sortablejs'

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

  start () {
    console.log('builder started ...')
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
