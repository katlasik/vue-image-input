export default {
  accept: {
    type: String,
    default: 'image/*'
  },
  value: {
    type: String
  },
  clickEnabled: {
    type: Boolean,
    default: true
  },
  dragEnabled: {
    type: Boolean,
    default: true
  },
  default: {
    type: String
  },
  maxSize: {
    type: Number
  },
  name: {
    type: String
  },
  alt: {
    type: String
  },
  labels: {
    type: Object,
    default() {
      return {
        default: 'Click or drag image.',
        drag: 'Drop image to select.'
      }
    }
  }
}
