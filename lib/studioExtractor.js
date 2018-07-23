const generatePropsValue = (element, type) => {
  let result = ''

  switch (type) {
    case 'image':
      result = element.src
      break

    default:
      result = element.innerText
      break
  }

  return result
}

const generateProps = (parent, child) => {
  const props = {
    key: parent.prop,
    data: parent.data,
    payload: {}
  }

  child.forEach(item => {
    const attrs = extractAttribute(item.dataset['octopus'])
    props['payload'][attrs.attr] = generatePropsValue(item, attrs.type)
  })

  return props
}

const extractAttribute = (string) => {
  const attributes = {}

  string.split('|').map(item => {
    const attr = item.split(':')
    attributes[attr[0]] = attr[1]
  })

  return attributes
}

const generateMap = async () => {
  const mapping = {
    slug: 'page-1',
    source: [],
    pageClass: 'container',
    components: [],
    styles: []
  }
  const component = []

  document.querySelectorAll('.studio-inner .component-item').forEach(item => {
    let element = item.childNodes[1]
    const attrs = extractAttribute(element.dataset['octopus'])
    component.push({
      title: attrs.component,
      name: attrs.component,
      path: 'global',
      props: generateProps(attrs, element.childNodes)
    })
  })

  mapping['components'] = component

  return mapping
}

export default generateMap
