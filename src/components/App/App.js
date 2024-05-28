import React, { useState } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './App.css'

const findIndexById = (array, id) => array.findIndex((el) => el.id === id)

function App() {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('All')

  const addItem = (text, time) => {
    const newTask = {
      id: Date.now().toString(36) + Math.random().toString(36),
      label: text,
      done: false,
      edited: false,
      created: new Date(),
      activeTimer: false,
      time,
      timerId: null,
    }
    setTodoData((prevState) => [newTask, ...prevState])
  }

  const deleteTask = (id) => {
    setTodoData((prevState) => {
      const idx = findIndexById(prevState, id)
      if (idx !== -1 && prevState[idx].timerId) {
        clearInterval(prevState[idx].timerId)
      }
      const updatedTasksArray = [...prevState.slice(0, idx), ...prevState.slice(idx + 1)]
      return updatedTasksArray
    })
  }

  const onToggleDone = (id) => {
    setTodoData((prevState) => {
      const idx = findIndexById(prevState, id)
      if (idx !== -1 && prevState[idx].timerId) {
        clearInterval(prevState[idx].timerId)
      }
      const updatedTasksArray = prevState.map((task, index) => {
        if (index !== idx) {
          return task
        }
        return { ...task, done: !task.done }
      })
      return updatedTasksArray
    })
  }

  const updateTask = (id, newLabel) => {
    setTodoData((prevState) => {
      const idx = findIndexById(prevState, id)
      if (idx !== -1) {
        const updatedTask = { ...prevState[idx], label: newLabel, created: new Date() }
        const updatedTasksArray = [...prevState.slice(0, idx), updatedTask, ...prevState.slice(idx + 1)]
        return updatedTasksArray
      }
      return prevState
    })
  }

  const onChangeFilter = (newFilterStatus) => {
    setFilter(newFilterStatus)
  }

  const onClearCompleted = () => {
    setTodoData((prevState) => prevState.filter((element) => !element.done))
  }

  const filteredTasks = () =>
    todoData.filter(({ done }) => {
      const all = filter === 'All'
      const completed = filter === 'Completed'
      return all || (completed && done) || (!completed && !done)
    })

  const timerStep = (id) => {
    setTodoData((prevState) =>
      prevState.map((todo) =>
        todo.id === id && todo.time > 0 && todo.activeTimer ? { ...todo, time: todo.time - 1000 } : todo
      )
    )
  }

  const onStartTimer = (id) => {
    setTodoData((prevState) => prevState.map((todo) => (todo.id === id ? { ...todo, activeTimer: true } : todo)))
  }

  const onStopTimer = (id) => {
    setTodoData((prevState) => prevState.map((todo) => (todo.id === id ? { ...todo, activeTimer: false } : todo)))
  }

  const todoCount = todoData.filter((el) => !el.done).length

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addItem={addItem} />
      </header>
      <section className="main">
        <TaskList
          filteredTasks={filteredTasks()}
          onDelete={deleteTask}
          onToggleDone={onToggleDone}
          updateTask={updateTask}
          onStartTimer={onStartTimer}
          onStopTimer={onStopTimer}
          timerStep={timerStep}
        />
        <Footer
          todoCount={todoCount}
          onChangeFilter={onChangeFilter}
          filter={filter}
          onClearCompleted={onClearCompleted}
        />
      </section>
    </section>
  )
}

export default App
