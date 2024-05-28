import PropTypes from 'prop-types'
import React, { useState } from 'react'

function NewTaskForm(props) {
  const [label, setLabel] = useState('')
  const [timeMin, setTimeMin] = useState('')
  const [timeSec, setTimeSec] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onTimeMinChange = (e) => {
    setTimeMin(e.target.value)
  }

  const onTimeSecChange = (e) => {
    setTimeSec(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { addItem } = props
    const totalTime = (Number(timeMin) || 0) * 60 * 1000 + (Number(timeSec) || 0) * 1000
    if (label.trim().length !== 0) {
      addItem(label, totalTime)
      setLabel('')
      setTimeMin('')
      setTimeSec('')
    }
  }
  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        type="text"
        className="new-todo"
        id="taskInput"
        name="taskInput"
        placeholder="Writing..."
        value={label}
        onChange={onLabelChange}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        value={timeMin}
        type="number"
        onChange={onTimeMinChange}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        value={timeSec}
        type="number"
        onChange={onTimeSecChange}
      />
      <button type="submit" style={{ display: 'none' }} aria-hidden />
    </form>
  )
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
}

export default NewTaskForm
