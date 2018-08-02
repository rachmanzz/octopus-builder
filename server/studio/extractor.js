const uniqueID = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return `${S4() + S4()}`
}

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
    data: `${parent.prop}_${uniqueID()}`,
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
      let hasStyle = 0
      const resultChild = result[item.classList[0]]
      const styleds = item.style

      Object.keys(styleds).forEach(keys => {
        if (keys.match(/\d/g)) {
          hasStyle += 1
          resultChild[styleds[keys]] = styleds[styleds[keys]]
        }
      })

      if (hasStyle === 0) {
        delete result[item.classList[0]]
      }
    }
  })

  return result
}

const extractClass = (arr) => {
  let result = ''

  arr.forEach(item => {
    if (item.indexOf('octopus') > -1) {
      result = item
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
    const section = column.querySelectorAll('section')

    result[index] = {
      column: index + 1,
      class: extractClass(column.classList),
      components: extractSubElement(section)
    }
  })

  return result
}

const extractComponent = (attr, element) => {
  const result = {
    name: attr['component'],
    class: extractClass(element.classList),
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

const generate = async (page) => {
  const mapping = {
    path: page['path'] || '/',
    root: page['root'] || 'share',
    class: 'container',
    components: [],
    styles: {
      scoped: false,
      lang: 'css',
      content: page['meta']['styles'] || ''
    }
  }

  const canvas = document.querySelector('.studio-inner').childNodes
  const contain = []

  canvas.forEach(item => {
    if (item.nodeName === 'DIV') {
      contain.push(item)
    }
  })

  contain.forEach((element, index) => {
    if (element.nodeName !== '#comment') {
      const canva = element.querySelector('section')
      const attribute = extractAttribute(getData(canva))
      const components = mapping['components']

      components[index] = extractComponent(attribute, canva)
    }
  })

  return mapping
}

export default {
  generate,
  generatePropsValue,
  extractAttribute
}
