import React, { Component } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './App.css'

const findIndexById = (array, id) => array.findIndex((el) => el.id === id)

class App extends Component {
  constructor() {
    super()
    this.state = {
      todoData: [],
      filter: 'All',
    }
  }

  addItem = (text) => {
    this.setState((prevState) => {
      const newTask = {
        id: Date.now().toString(36) + Math.random().toString(36),
        label: text,
        done: false,
        edited: false,
        created: new Date(),
      }
      return {
        todoData: [newTask, ...prevState.todoData],
      }
    })
  }

  deleteTask = (id) => {
    this.setState((prevState) => {
      const idx = findIndexById(prevState.todoData, id)
      clearInterval(prevState.todoData[idx].timerId)
      const updatedTasksArray = [...prevState.todoData.slice(0, idx), ...prevState.todoData.slice(idx + 1)]
      return {
        todoData: updatedTasksArray,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState((prevState) => {
      const idx = findIndexById(prevState.todoData, id)
      clearInterval(prevState.todoData[idx].timerId)
      const updatedTasksArray = prevState.todoData.map((task, index) => {
        if (index !== idx) {
          return task
        }
        return { ...task, done: !task.done }
      })
      return {
        todoData: updatedTasksArray,
      }
    })
  }

  updateTask = (id, newLabel) => {
    this.setState((prevState) => {
      const idx = findIndexById(prevState.todoData, id)
      const updatedTask = { ...prevState.todoData[idx], label: newLabel, created: new Date() }
      const updatedTasksArray = [...prevState.todoData.slice(0, idx), updatedTask, ...prevState.todoData.slice(idx + 1)]
      return {
        todoData: updatedTasksArray,
      }
    })
  }

  onChangeFilter = (newFilterStatus) => {
    this.setState({ filter: newFilterStatus })
  }

  onClearCompleted = () => {
    this.setState((prevState) => ({ todoData: prevState.todoData.filter((element) => !element.done) }))
  }

  filteredTasks = () => {
    const { todoData, filter } = this.state
    return todoData.filter(({ done }) => {
      const all = filter === 'All'
      const completed = filter === 'Completed'
      return all || (completed && done) || (!completed && !done)
    })
  }

  render() {
    const { todoData, filter } = this.state
    const todoCount = todoData.filter((el) => !el.done).length
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addItem={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            filteredTasks={this.filteredTasks()}
            onDelete={this.deleteTask}
            onToggleDone={this.onToggleDone}
            updateTask={this.updateTask}
          />
          <Footer
            todoCount={todoCount}
            onChangeFilter={this.onChangeFilter}
            filter={filter}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    )
  }
}

export default App
