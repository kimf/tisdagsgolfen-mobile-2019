import React, { Component, PropTypes } from 'react'

const { arrayOf, node, oneOfType, shape } = PropTypes
const propTypes = {
  context: shape().isRequired,
  children: oneOfType([
    arrayOf(node),
    node
  ]).isRequired
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
  Object.keys(context).forEach(propertyName => (
    DynamicWithContext.childContextTypes[propertyName] = PropTypes.any
  ))

  return (
    <DynamicWithContext context={context}>
      {children}
    </DynamicWithContext>
  )
}

WithContext.propTypes = propTypes

export default WithContext
