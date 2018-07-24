const uniqueID = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return `${S4() + S4()}`
}

const setEditable = (index, cb) => {
  const component = document.querySelectorAll('.component-item')

  component.forEach(item => item.classList.remove('component-item_active'))
  component[index].classList.add('component-item_active')

  document.querySelectorAll('.component-item [data-octopus]').forEach(item => {
    const dataOctopus = item.dataset.octopus

    if (dataOctopus.indexOf('component') > -1) {
      if (item.classList.value.indexOf('octopus_') === -1) {
        item.classList.add(`octopus_${uniqueID()}`)
      }
    }

    if (dataOctopus.indexOf('type:text') > -1) {
      item.setAttribute('contenteditable', true)
    }
  })
}

const setDrop = (arr, dragResult) => {
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

export default {
  uniqueID,
  setEditable,
  setDrop
}
