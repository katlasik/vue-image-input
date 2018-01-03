import { beforeEachHooks, afterEachHooks, mount, waitForUpdate } from 'vue-unit'
import VueImageInput from '@/components/VueImageInput'

describe('VueImageInput', () => {
  beforeEach(beforeEachHooks)

  it('should invoke click on file dialog on click on container', () => {
    const vm = mount(VueImageInput)

    const click = sinon.spy()
    vm.$refs.input.click = click

    vm.click()

    expect(click).to.be.calledOnce
  })

  it('should not invoke click on file dialog on click on container when "clickEnabled" is false', () => {
    const vm = mount(VueImageInput, {
      clickEnabled: false
    })

    const click = sinon.spy()
    vm.$refs.input.click = click

    vm.click()

    expect(click).to.not.be.called
  })

  it('should invoke click on file dialog on click on image', () => {
    const vm = mount(VueImageInput, {
      value: '/static/logo.png'
    })

    const click = sinon.spy()
    vm.$refs.input.click = click

    vm.$el.querySelector('img').click()

    expect(click).to.be.calledOnce
  })

  it('should emit "click" event on click', (done) => {
    const spy = sinon.spy()
    const vm = mount(VueImageInput, {}, {click: spy})

    vm.click()

    waitForUpdate(() => {
      expect(spy).to.be.called
    }).end(done)
  })

  it('should emit "change" on file change', (done) => {
    const spy = sinon.spy()
    const vm = mount(VueImageInput, {}, {change: spy})

    const file = new Blob([''], { type: 'image/png' })

    vm.$refs.input = {
      files: [file]
    }

    vm.change()

    waitForUpdate(() => {
      expect(spy).to.be.calledOnce
    }).end(done)
  })

  it('should load file on file change', (done) => {
    const vm = mount(VueImageInput)

    const readAsDataURL = sinon.spy()
    vm.reader.readAsDataURL = readAsDataURL

    const file = new Blob([''], { type: 'image/png' })

    vm.$refs.input = {
      files: [file]
    }

    vm.change()

    waitForUpdate(() => {
      expect(readAsDataURL.withArgs(file)).to.be.calledOnce
    }).end(done)
  })

  it('should emit "input" event and set value when file is loaded', (done) => {
    const spy = sinon.spy()
    const vm = mount(VueImageInput, {}, { input: spy })

    const file = new Blob([''], { type: 'image/png' })

    const reader = {
      onload: vm.reader.onload,
      result: file
    }

    vm.reader = reader

    vm.reader.onload(file)

    waitForUpdate(() => {
      expect(vm.internalValue).to.be.equal(file)
      expect(spy.withArgs(file)).to.be.calledOnce
    }).end(done)
  })

  it('should not emit "drop" when "dragEnabled" is set to false', (done) => {
    const spy = sinon.spy()

    const vm = mount(VueImageInput, {
      dragEnabled: false
    }, {
      'drop': spy
    })

    vm.drop()

    waitForUpdate(() => {
      expect(spy).to.not.be.called
    }).end(done)
  })

  it('should emit "drop", "dragend" and "change" on file drop', (done) => {
    const dropSpy = sinon.spy()
    const dragendSpy = sinon.spy()
    const changeSpy = sinon.spy()

    const vm = mount(VueImageInput, { accept: 'image/jpg' }, {
      'drop': dropSpy,
      'dragend': dragendSpy,
      'change': changeSpy
    })
    const file = { type: 'image/jpg', size: 1023 }

    const event = {
      dataTransfer: {
        files: [ file ]
      }
    }

    vm.dragActive = true
    vm.drop(event)

    waitForUpdate(() => {
      expect(dropSpy.withArgs({event, file})).to.be.calledOnce
      expect(changeSpy.withArgs({file})).to.be.calledOnce
      expect(dragendSpy.withArgs({event})).to.be.calledOnce
    }).end(done)
  })

  it('should not emit "dragend" if "dragActive" is false', (done) => {
    const spy = sinon.spy()

    const vm = mount(VueImageInput, { dragEnabled: false }, {
      'dragend': spy
    })

    vm.dragActive = false
    vm.dragEnd(event)

    waitForUpdate(() => {
      expect(spy).not.to.be.called
    }).end(done)
  })

  it('should not emit "dragstart" on start of file dragging if property "dragEnabled" is false', (done) => {
    const spy = sinon.spy()

    const vm = mount(VueImageInput, { dragEnabled: false }, {
      'dragstart': spy
    })
    const file = { type: 'image/jpg', size: 1023 }

    const event = {
      dataTransfer: {
        files: [ file ]
      }
    }

    vm.dragStart(event)

    expect(vm.dragActive).to.be.false

    waitForUpdate(() => {
      expect(spy).not.to.be.called
    }).end(done)
  })

  it('should emit "dragstart" on start of file dragging only if property "dragEnabled" is true', (done) => {
    const spy = sinon.spy()

    const vm = mount(VueImageInput, {}, {
      'dragstart': spy
    })
    const file = { type: 'image/jpg', size: 1023 }

    const event = {
      dataTransfer: {
        files: [ file ]
      }
    }

    vm.dragStart(event)

    expect(vm.dragActive).to.be.true

    waitForUpdate(() => {
      expect(spy.withArgs({event})).to.be.calledOnce
    }).end(done)
  })

  it('should emit "error" on failed validation', (done) => {
    const spy = sinon.spy()
    const vm = mount(VueImageInput, {}, { error: spy })

    const file = { type: 'image/jpg', size: 1023 }

    const errorMsg = {
      error: {
        type: 'fileType',
        expected: 'image/jpg',
        actual: 'image/png'
      },
      valid: false
    }

    vm.validator.validate = sinon.stub().returns(errorMsg)

    vm.update(file)

    waitForUpdate(() => {
      expect(spy.withArgs(errorMsg.error)).to.be.calledOnce
    }).end(done)
  })

  afterEach(afterEachHooks)
})
