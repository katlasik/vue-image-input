import MimeMatcher from 'mime-matcher'

export default class Validator {
  constructor({accept, maxSize}) {
    this.maxSize = maxSize
    this.accept = accept
    this.mimeMatcher = new MimeMatcher(accept)
  }
  validate(file) {
    if (!this.mimeMatcher.match(file.type)) {
      return {
        error: {
          type: 'fileType',
          expected: this.accept,
          actual: file.type
        },
        valid: false
      }
    }

    if (this.maxSize && file.size > this.maxSize) {
      return {
        error: {
          type: 'maxSize',
          expected: this.maxSize,
          actual: file.size
        },
        valid: false
      }
    }

    return {
      valid: true
    }
  }
}
