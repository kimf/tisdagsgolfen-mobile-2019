import React, { Component } from 'react'
import { any, arrayOf, node, oneOfType, shape } from 'prop-types'

const propTypes = {
  context: shape().isRequired,
  children: oneOfType([arrayOf(node), node]).isRequired
}

const WithContext = ({ context, children }) => {
  class DynamicWithContext extends Component {
    static propTypes = propTypes

    getChildContext() {
      return this.props.context
    }
    render() {
      return this.props.children
    }
  }

  DynamicWithContext.childContextTypes = {}
  Object.keys(context).forEach(propertyName => (DynamicWithContext.childContextTypes[propertyName] = any))

  return <DynamicWithContext context={context}>{children}</DynamicWithContext>
}

WithContext.propTypes = propTypes

export default WithContext
