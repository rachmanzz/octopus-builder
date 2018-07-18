import fs from 'fs'
import path from 'path'

const readDir = (dir, type = '', fileList = []) => {
  fs.readdirSync(dir).forEach(file => {
    if (file === '.git') return

    const filePath = path.join(dir, file)

    fileList.push(
      fs.statSync(filePath).isDirectory()
        ? { [file]: readDir(filePath, type) }
        : file
    )
  })

  return fileList
}

export default {
  readDir
}
