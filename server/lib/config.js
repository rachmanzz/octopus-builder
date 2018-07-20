import path from 'path'
import readYaml from 'read-yaml'
import writeYaml from 'write-yaml'

const file = path.resolve('./octopus.yaml')

const read = async () => {
  const result = await readYaml.sync(file)

  return result
}

const write = async (content) => {
  await writeYaml.sync(file, content)
  const result = await readYaml.sync(file)

  return result
}

export default {
  read,
  write
}
