import TextEditor from '@/components/TextEditor'

describe('TextEditor.vue', () => {
  it('is implementation of iEditor', () => {
    expect(TextEditor.mixins.length > 0).to.equal(true)
    const iEditor = TextEditor.mixins[0]
    const defaultData = iEditor.data()
    expect(defaultData.hasOwnProperty('valueModel')).to.equal(true)
  })
})
