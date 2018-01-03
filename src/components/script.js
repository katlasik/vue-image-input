import props from './props'
import Validator from './validator'

export default {
  data() {
    return {
      internalValue: undefined,
      dragActive: false
    }
  },
  props: props,
  mounted() {
    this.reader = new FileReader()
    this.validator = new Validator({
      accept: this.accept,
      maxSize: this.maxSize
    })

    this.reader.onload = () => {
      const result = this.reader.result
      this.$emit('input', result)
      this.internalValue = result
    }
  },
  computed: {
    src() {
      return this.value || this.internalValue || this.default
    },
    displayDefaultSlot() {
      return !this.src && !this.displayDraggingSlot
    },
    displayDraggingSlot() {
      return this.dragActive
    }
  },
  methods: {
    click() {
      if (this.clickEnabled) {
        this.$emit('click')
        this.$refs.input.click()
      }
    },
    change(event) {
      const [file] = this.$refs.input.files
      this.update(file)
    },
    update(file) {
      this.$emit('change', { file })
      const validationResult = this.validator.validate(file)
      if (validationResult.valid) {
        this.reader.readAsDataURL(file)
      } else {
        this.$emit('error', validationResult.error)
      }
    },
    dragStart(event) {
      if (this.dragEnabled) {
        this.dragActive = true
        this.$emit('dragstart', { event })
      }
    },
    dragEnd(event) {
      if (this.dragActive) {
        this.dragActive = false
        this.$emit('dragend', { event })
      }
    },
    drop(event) {
      if (this.dragEnabled) {
        const [file] = event.dataTransfer.files
        this.$emit('drop', { event, file })
        this.update(file)
        this.dragEnd(event)
      }
    }
  }
}
