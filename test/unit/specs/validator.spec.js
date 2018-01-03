import Validator from '@/components/validator'

describe('VueImageInput', () => {
  it('should reject file with invalid size', () => {
    const validator = new Validator({accept: 'image/*', maxSize: 1024})
    const file = { type: 'image/png', size: 1025 }

    expect(validator.validate(file)).to.eql({
      error: {
        type: 'maxSize',
        expected: 1024,
        actual: 1025
      },
      valid: false
    })
  })

  it('should accept file with valid size', () => {
    const validator = new Validator({accept: 'image/*', maxSize: 1024})
    const file = { type: 'image/png', size: 1023 }

    expect(validator.validate(file)).to.eql({
      valid: true
    })
  })

  it('should reject file with invalid type', () => {
    const validator = new Validator({ accept: 'image/jpg' })
    const file = { type: 'image/png', size: 1023 }

    expect(validator.validate(file)).to.eql({
      error: {
        type: 'fileType',
        expected: 'image/jpg',
        actual: 'image/png'
      },
      valid: false
    })
  })

  it('should accept file with valid type', () => {
    const validator = new Validator({ accept: 'image/jpg' })
    const file = { type: 'image/jpg', size: 1023 }

    expect(validator.validate(file)).to.eql({
      valid: true
    })
  })
})
