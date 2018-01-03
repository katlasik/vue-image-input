import { beforeEachHooks, afterEachHooks, mount, waitForUpdate, simulate } from 'vue-unit'
import VueImageInput from '@/components/VueImageInput'

describe('VueImageInput', () => {
  beforeEach(beforeEachHooks)

  it('should render correct html with default values', () => {
    const vm = mount(VueImageInput)

    expect(vm.$el).to.have.class('vii')

    expect(vm.$el.querySelector('input')).to.have.attr('type', 'file')
    expect(vm.$el.querySelector('input')).to.have.attr('accept', 'image/*')
  })

  it('should render name attribute correctly', () => {
    const vm = mount(VueImageInput, {name: 'picture'})
    expect(vm.$el.querySelector('input')).to.have.attr('name', 'picture')
  })

  it('should render alt attribute correctly', () => {
    const vmImg = mount(VueImageInput, {alt: 'Some description', value: '/static/logo.png'})
    const vmDefault = mount(VueImageInput, {alt: 'Some description', default: '/static/logo.png'})
    const vmSlot = mount(VueImageInput, {alt: 'Some description'}, {}, { default: '<span>Kliknij, żeby wybrać obrazek.</span>' })
    const vmDrag = mount(VueImageInput, {alt: 'Some description'}, {}, { default: '<span>Kliknij, żeby wybrać obrazek.</span>' })
    simulate(vmDrag.$el, 'dragstart')

    expect(vmImg.$el.querySelector('img')).to.have.attr('alt', 'Some description')
    expect(vmDefault.$el.querySelector('img')).to.have.attr('alt', 'Some description')
    expect(vmSlot.$el.querySelector('figure')).to.have.attr('aria-label', 'Some description')
    expect(vmDrag.$el.querySelector('figure')).to.have.attr('aria-label', 'Some description')
  })

  it('should render correct html with default slot', () => {
    const vm = mount(VueImageInput)
    expect(vm.$el.querySelector('figure .vii-slot')).to.have.text('Click or drag image.')
  })

  it('should render correct html with custom default slot specified ', () => {
    const vm = mount(VueImageInput, {
      labels: {
        default: 'Kliknij, żeby wybrać obrazek.'
      }
    })

    expect(vm.$el.querySelector('figure .vii-slot')).to.have.text('Kliknij, żeby wybrać obrazek.')
  })

  it('should render correct html with custom default label ', () => {
    const vm = mount(VueImageInput, {}, {}, { default: '<span>Kliknij, żeby wybrać obrazek.</span>' })

    expect(vm.$el.querySelector('figure span')).to.have.text('Kliknij, żeby wybrać obrazek.')
  })

  it('should render correct html with default drag slot specified ', (done) => {
    const vm = mount(VueImageInput)
    simulate(vm.$el, 'dragstart')

    waitForUpdate(() => {
      expect(vm.$el.querySelector('figure .vii-slot')).to.have.text('Drop image to select.')
    }).end(done)
  })

  it('should render correct html with custom drag slot label ', () => {
    const label = 'Upuść obrazek.'
    const vm = mount(VueImageInput, {
      labels: {
        default: label
      }
    })
    simulate(vm.$el, 'dragstart')

    expect(vm.$el.querySelector('figure .vii-slot')).to.have.text(label)
  })

  it('should render correct html with custom drag slot ', (done) => {
    const vm = mount(VueImageInput, {}, {}, { drag: '<span>Upuść obrazek.</span>' })

    simulate(vm.$el, 'dragstart')

    waitForUpdate(() => {
      expect(vm.$el.querySelector('figure span')).to.have.text('Upuść obrazek.')
    }).end(done)
  })

  it('should render correct html with default image', () => {
    const imgPath = '/static/logo.png'

    const vm = mount(VueImageInput, {
      value: imgPath
    })

    expect(vm.$el.querySelector('img')).to.have.attr('src', imgPath)
  })

  it('should render correct html with image as value', () => {
    const imgPath = '/static/logo.png'

    const vm = mount(VueImageInput, {
      default: imgPath
    })

    expect(vm.$el.querySelector('img')).to.have.attr('src', imgPath)
  })

  afterEach(afterEachHooks)
})
