import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

export default class Task extends Component {
  constructor() {
    super()
    this.state = {
      сhangedTaskLabel: '',
      edited: false,
    }
  }

  onClickEdit = (prevLabel) => {
    this.setState({
      сhangedTaskLabel: prevLabel,
      edited: true,
    })
  }

  onChangeTask = (event) => {
    this.setState({ сhangedTaskLabel: event.target.value })
  }

  onSubmitUpdatedTask = (event) => {
    event.preventDefault()
    const { updateTask, id } = this.props
    const { сhangedTaskLabel } = this.state
    if (сhangedTaskLabel.trim()) {
      updateTask(id, сhangedTaskLabel)
      this.setState({ edited: false })
    }
  }

  render() {
    const { label, onDelete, onToggleDone, done, created, id } = this.props
    const { edited, сhangedTaskLabel } = this.state

    let liClassName = null
    if (done) {
      liClassName = 'completed'
    } else if (edited) {
      liClassName = 'editing'
    }

    return (
      <li className={liClassName}>
        {edited ? (
          <form onSubmit={this.onSubmitUpdatedTask}>
            <input type="text" className="edit" value={сhangedTaskLabel} onChange={this.onChangeTask} />
          </form>
        ) : (
          <div className="view">
            <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} id={id} />
            <label htmlFor={id}>
              <span className="description">{label}</span>
              <span className="created">created {formatDistanceToNow(created, { includeSeconds: true })} ago</span>
            </label>
            {!done && (
              <button
                aria-label="Edit"
                type="button"
                className="icon icon-edit"
                onClick={() => this.onClickEdit(label)}
              />
            )}
            <button aria-label="Delete" type="button" className="icon icon-destroy" onClick={onDelete} />
          </div>
        )}
      </li>
    )
  }
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
}
