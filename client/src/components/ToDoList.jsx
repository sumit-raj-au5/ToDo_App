import React from 'react'
import {Button, Stack} from 'react-bootstrap'

function ToDoList(props) {
  return (
    <Stack direction="horizontal" gap={3} className="todo-item mt-2" key={props.id}>
    <div className="checker">
      <span>
        <input
          type="checkbox"
          id={props.id}
          onChange={props.handleTaskClick}
          checked={props.completed}
        />
      </span>
    </div>
    <label htmlFor={props.id}>
      {props.completed ? <del>{props.toDoValue}</del> : props.toDoValue}
    </label>
    <div>{props.toDoCreated?props.toDoCreated:""}</div>
    {/* <Button variant="outline-warning" size="sm" onClick={props.handleTaskEdit}>Edit</Button>{' '}
    <Button variant="outline-danger"  size="sm" onClick={props.handleTaskDelete}>Delete</Button>{' '} */}
  </Stack>
  )
}

export default ToDoList