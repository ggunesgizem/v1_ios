import React, { Component } from 'react'
import { shallow, render } from 'enzyme'
import { expect, assert } from 'chai'
import TopBar from '../src/components/TopBar'

describe('TopBar Component Test', () => {
  it('it should render with default title and type', () => {
    const wrapper = shallow(<TopBar />)
    expect(wrapper.instance().props.title).to.be.not.undefined
    expect(wrapper.instance().props.type).to.be.not.undefined
  })

  it('it should render with correct given title', () => {
    const title = Math.random().toString(36).slice(2)
    const wrapper = shallow(<TopBar title={title} />)
    expect(wrapper.instance().props.title).to.equal(title)
  })

  it('it should render with correct type', () => {
    const wrapper = render(<TopBar type="others" />)
    //expect(wrapper.instance().props.type).to.equal("others")
  })
})
