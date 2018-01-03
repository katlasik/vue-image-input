<template>
  <div>
    <div class='app' id='app'>
      <vue-image-input :click-enabled="false" @click="click()"></vue-image-input>
      <vue-image-input v-model='x' draggable='true' :drag-supported='true' ref='preview'  @change='change' class='preview' default='/static/logo.png'/>
      <vue-image-input class='preview' :max-size='525500' accept='image/gif' :drag='true'  default='/static/logo.png'>
        <div slot='dragging'>Dragging</div>
      </vue-image-input>
      <vue-image-input class='preview' v-model='x' :drag='true'/>

      <vue-image-input class='preview' v-model='y' @error="error()" accept='image/png' :drag='true'>
        <div class="slot" slot='default'>Please select or drag image.</div>
        <div class="slot" slot='drag'>Drop to select</div>
      </vue-image-input>

      <vue-image-input class='preview' :drag="true" :labels="{'default': 'Kliknij albo przeciągnij plik.', 'drag': 'Upuść żeby wybrać.'}">
      </vue-image-input>

      <vue-image-input :drag="false" :labels="{'default': 'Kliknij albo przeciągnij plik.', 'drag': 'Upuść żeby wybrać.'}">
      </vue-image-input>

      <button @click='open()'>click</button>
    </div>
  </div>
</template>

<script>
import VueImageInput from './components/VueImageInput'

export default {
  name: 'examples',
  data() {
    return {
      image: '/static/logo.png',
      y: null,
      x: null
    }
  },
  components: {
    VueImageInput
  },
  methods: {
    click() {
      alert()
    },
    input() {
      this.image = '/static/logo.png'
    },
    change(file) {
      console.log(file)
    },
    open() {
      this.$refs.preview.click()
    },
    error() {
      alert('Wrong image.')
    }
  }
}
</script>

<style lang='scss'>
.app {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  * + * {
    margin-top: 10px;
  }
}

.vii.preview {
  height: 30vh;
  width: 20vw;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

}

  .slot {
    height: 100%;
    width: 100%;
    border: 3.5rem solid #DDD;
    padding: 1rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
</style>
