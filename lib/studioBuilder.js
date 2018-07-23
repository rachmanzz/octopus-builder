const setEditable = (index) => {
  const component = document.querySelectorAll('.component-item')

  component.forEach(item => item.classList.remove('component-item_active'))
  component[index].classList.add('component-item_active')

  document.querySelectorAll('.component-item [data-oct-text]').forEach(item => item.setAttribute('contenteditable', true))
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
  setEditable,
  setDrop
}
