<template>
  <div class="content">
    <Navbar :data="navbar" :save="onSave" />
    <Monaco
      :width="editorWidth"
      :height="editorHeight"
      language="html"
      theme="vs"
      :code="content"
      @mounted="onMounted"
      @codeChange="onCodeChange"
      >
    </Monaco>
    <Status :data="status" />
  </div>
</template>

<script>
import axios from 'axios'
import Monaco from 'monaco-editor-forvue'
import Navbar from '~/components/global/Navbar.vue'
import Status from '~/components/global/Status.vue'

export default {
  components: {
    Monaco,
    Navbar,
    Status
  },
  data () {
    return {
      navbar: {
        title: 'Editor',
        save: true
      },
      status: {
        onLoading: true
      },
      content: '<!-- do stuff -->',
      contentChanged: '',
      editorWidth: 0,
      editorHeight: 0,
      file: null
    }
  },
  mounted () {
    if (process.browser) {
      this.editorWidth = window.innerWidth - 250
      this.editorHeight = window.innerHeight - (57 * 2)
    }
  },
  methods: {
    onMounted (editor) {
      this.editor = editor

      const query = this.$route.query['file']
      const path = this.$store.state.allFiles[query]

      if (!path) {
        this.$router.push('/components')
      } else {
        axios.post('/api/component', {
          path: path['path']
        }).then(res => {
          this.file = path
          this.navbar.title = path.fileName
          this.status['onLoading'] = false

          editor.setValue(res.data)
        })
      }
    },
    onCodeChange (editor) {
      this.contentChanged = editor.getValue()
    },
    onSave () {
      axios.put('/api/component', {
        path: this.file['path'],
        string: this.contentChanged
      }).then(res => {
        this.$snotify.success(`File ${this.file.fileName} saved`)
        setTimeout(() => this.$router.push('/components'), 500)
      })
    }
  }
}
</script>

<style>
.editor {
  width: 600px;
  height: 800px;
}
</style>
