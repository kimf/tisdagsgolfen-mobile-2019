import React, { Component } from 'react'

const WithContext = ({ context, children }) => {
  class DynamicWithContext extends Component {
    getChildContext() {
      return this.props.context
    }
    render() {
      return this.props.children
    }
  }

  DynamicWithContext.childContextTypes = {}
  Object.keys(context).forEach(
    propertyName => (DynamicWithContext.childContextTypes[propertyName] = any)
  )

  return <DynamicWithContext context={context}>{children}</DynamicWithContext>
}

export default WithContext
