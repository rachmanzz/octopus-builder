const extractAttribute = (string) => {
  const attributes = {}

  string.split('|').map(item => {
    const attr = item.split(':')
    attributes[attr[0]] = attr[1]
  })

  return attributes
}

const getData = (element) => {
  return element.dataset['octopus']
}

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
    key: parent.attr,
    data: parent.prop,
    payload: {}
  }

  child.forEach(item => {
    const attrs = extractAttribute(item.dataset['octopus'])
    props['payload'][attrs.attr] = generatePropsValue(item, attrs.type)
  })

  return props
}

const generateStyle = (attribute, child) => {
  const result = {}

  child.forEach(item => {
    if (item.classList[0]) {
      result[item.classList[0]] = {}
      const resultChild = result[item.classList[0]]
      const styleds = item.style

      Object.keys(styleds).forEach(keys => {
        if (keys.match(/\d/g)) {
          resultChild[styleds[keys]] = styleds[styleds[keys]]
        }
      })
    }
  })

  return result
}

const extractSubElement = (section) => {
  const result = []

  section.forEach((item, index) => {
    const attr = extractAttribute(item.dataset['octopus'])
    result[index] = extractComponent(attr, item)
  })

  return result
}

const extractElement = (parent) => {
  const result = []

  parent.childNodes.forEach((column, index) => {
    const attribute = extractAttribute(column.dataset['octopus'])
    const section = column.querySelectorAll('section')

    result[index] = {
      attr: attribute,
      class: column.classList,
      components: extractSubElement(section)
    }
  })

  return result
}

const extractComponent = (attr, element) => {
  const result = {
    name: attr['component'],
    class: element.classList,
    path: attr['path'] || 'global'
  }

  if (attr['type'] && attr['type'] === 'column') {
    result['rows'] = extractElement(element)
  } else {
    result['props'] = generateProps(attr, element.childNodes)
    result['styles'] = generateStyle(attr, element.childNodes)
  }

  return result
}

const generateMap = async () => {
  const mapping = {
    slug: 'page-1',
    class: 'container',
    components: [],
    styles: {
      scoped: false,
      lang: 'css',
      content: ''
    }
  }

  const canvas = document.querySelector('.studio-inner').childNodes

  canvas.forEach((element, index) => {
    const canva = element.querySelector('section')
    const attribute = extractAttribute(getData(canva))
    const components = mapping['components']

    components[index] = extractComponent(attribute, canva)
  })

  return mapping
}

export default {
  generateMap,
  generatePropsValue,
  extractAttribute
}
