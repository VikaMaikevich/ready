import PropTypes from 'prop-types'
import React from 'react'

import Task from '../Task/Task'
import './TaskList.css'

function TaskList({ filteredTasks, onDelete, updateTask, onToggleDone }) {
  const elements = filteredTasks.map((item) => (
    <Task
      id={item.id}
      label={item.label}
      done={item.done || false}
      created={item.created}
      key={item.id}
      onDelete={() => onDelete(item.id)}
      onToggleDone={() => onToggleDone(item.id)}
      updateTask={updateTask}
    />
  ))

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  onDelete: () => {},
  onToggleDone: () => {},
}

TaskList.propTypes = {
  onDelete: PropTypes.func,
  onToggleDone: PropTypes.func,
  updateTask: PropTypes.func.isRequired,
}

export default TaskList
