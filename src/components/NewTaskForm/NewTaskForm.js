import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
      timeMin: '',
      timeSec: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onTimeMinChange = (e) => {
    this.setState({
      timeMin: e.target.value,
    })
  }

  onTimeSecChange = (e) => {
    this.setState({
      timeSec: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { label, timeMin, timeSec } = this.state
    const { addItem } = this.props
    const totalTime = (Number(timeMin) || 0) * 60 * 1000 + (Number(timeSec) || 0) * 1000
    if (label.trim().length !== 0) {
      addItem(label, totalTime)
      this.setState({
        label: '',
        timeMin: '',
        timeSec: '',
      })
    }
  }

  render() {
    const { label, timeMin, timeSec } = this.state
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          type="text"
          className="new-todo"
          id="taskInput"
          name="taskInput"
          placeholder="Writing..."
          value={label}
          onChange={this.onLabelChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          value={timeMin}
          type="number"
          onChange={this.onTimeMinChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          value={timeSec}
          type="number"
          onChange={this.onTimeSecChange}
        />
        <button type="submit" style={{ display: 'none' }} aria-hidden />
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
}
