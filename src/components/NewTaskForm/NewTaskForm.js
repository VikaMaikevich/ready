import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { label } = this.state
    const { addItem } = this.props
    if (label.trim().length !== 0) {
      addItem(label)
      this.setState({
        label: '',
      })
    }
  }

  render() {
    const { label } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          id="taskInput"
          name="taskInput"
          placeholder="What needs to be done?"
          value={label}
          onChange={this.onLabelChange}
        />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
}
