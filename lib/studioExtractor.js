const generatePropsValue = (element, data) => {
  let result = ''

  if (data['octKey'] === 'image') {
    result = element.src
  } else {
    result = element.innerText
  }

  return result
}

const generateProps = (parent, child) => {
  const props = {
    key: parent.dataset['octProps'],
    data: parent.dataset['octPropsKey'],
    payload: {}
  }

  child.forEach(item => {
    props['payload'][item.dataset['octKey']] = generatePropsValue(item, item.dataset)
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
      props: generateProps(element, element.childNodes)
    })
  })

  mapping['components'] = component

  return mapping
}

export default generateMap
