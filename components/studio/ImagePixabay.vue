<template>
  <section class="properties-item">
    <div v-if="editable">
      <el-input placeholder="Please input" v-model="pixabay['query']" class="input-with-select">
        <el-select v-model="pixabay['category']" slot="prepend" placeholder="Select">
          <el-option
            v-for="item in select"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="findImage" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div class="el-wrapper" v-loading="loading">
        <div class="el-wrapper__inner">
          <el-row :gutter="12">
            <el-col
              :span="12"
              v-for="item in results['hits']"
              v-bind:key="item.key"
            >
              <el-card shadow="never">
                <img :src="item['previewURL']" :alt="item['user']" @click="setImage(item)">
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="el-logo">
          Images by <img src="https://www.vectorlogo.zone/logos/pixabay/pixabay-card.png" alt="Pixabay">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  props: ['picked'],
  data () {
    return {
      editable: true,
      select: [
        { label: 'Animals', value: 'animals' },
        { label: 'Backgrounds', value: 'backgrounds' },
        { label: 'Buildings', value: 'buildings' },
        { label: 'Business', value: 'business' },
        { label: 'Computer', value: 'computer' },
        { label: 'Education', value: 'education' },
        { label: 'Fashion', value: 'fashion' },
        { label: 'Feelings', value: 'feelings' },
        { label: 'Food', value: 'food' },
        { label: 'Health', value: 'health' },
        { label: 'Industry', value: 'industry' },
        { label: 'Music', value: 'music' },
        { label: 'Nature', value: 'nature' },
        { label: 'People', value: 'people' },
        { label: 'Places', value: 'places' },
        { label: 'Religion', value: 'religion' },
        { label: 'Science', value: 'science' },
        { label: 'Sports', value: 'sports' },
        { label: 'Transportation', value: 'transportation' },
        { label: 'Travel', value: 'travel' }
      ],
      results: [],
      loading: false,
      pixabay: {
        query: '',
        category: ''
      }
    }
  },
  methods: {
    findImage () {
      this.loading = true

      axios.post('/core/photos', {
        query: this.pixabay['query'],
        category: this.pixabay['category']
      }).then(res => {
        this.loading = false
        this.results = res['data']
      })
    },
    setImage (item) {
      this.picked(item)
    }
  }
}
</script>

<style lang="scss">
.el-select .el-input {
  width: 100px;
}
.el-wrapper {
  margin: 1rem 0;

  &__inner {
    height: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .el-logo {
    display: inline-block;
    font-size: 12px;
    float: right;

    img {
      width: 50px;
    }
  }
}
.el-card {
  margin: .5rem 0;
  max-height: 80px;
  cursor: pointer;
  
  &__body {
    padding: 0;
  }
  img {
    width: 100%;
    height: auto;
  }
}
</style>
