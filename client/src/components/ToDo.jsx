import React, { useState, useEffect } from "react";
import "./Todo.css";
import { Button } from "react-bootstrap";
import ToDoList from "./ToDoList"
import axios from "axios";

function ToDo({user}) {
    const [allToDoArray, setAllToDoArray] = useState([]);
    const [fetchedData, setFetchedData] = useState(0);
    const [newToDo, setNewToDo] = useState("");
    const [toDoArrayDisplay, setToDoArrayDisplay] = useState([])
  
     function handleChange(event) {
      setNewToDo(event.target.value);
    }
  
    //adding task to all task list
     function handleSubmit(event) {
      event.preventDefault();
      console.log("SubmittedToDo added");
      if (newToDo !== "") {
        setAllToDoArray((preAllToDoArray) => [
          ...preAllToDoArray,
          { completed: false, toDoValue: newToDo, date: new Date().toLocaleString() },
        ]);
        setNewToDo("");
        setFetchedData((prevCount)=> prevCount+1);
      }
    }
   
  useEffect(() => {
    setToDoArrayDisplay(allToDoArray)
  }, [setAllToDoArray, allToDoArray])
  
  //loading todo items from server on login
  const getToDoList = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_USER_TASK_URL}/${user._json.email}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    setFetchedData(1);
    console.log(`task fetched to frontend for user ${data.data}`);
    return data.data;
  };
  useEffect(()=>{
      getToDoList().then((data)=>setAllToDoArray(data));
      console.log(`first render set all task ${allToDoArray}, and FetchedData Count ${fetchedData}`)
  },[])
  //displaying fetchedCount in console for debug
  useEffect(()=>{
    console.log(`FetchedData Count ${fetchedData}`)
},[fetchedData])
  //when a new task is updated it is being sent to server
  useEffect(async ()=>{
    if(allToDoArray && fetchedData > 1 ){
      console.log(`Checking array for new data ${allToDoArray} and fetchedCount ${fetchedData}`);
      const bodyJSON = {
        tasks:allToDoArray,
        user:user._json.email
      }
      console.log(bodyJSON);
    
      await axios
        .post(process.env.REACT_APP_ADD_TASK_URL, bodyJSON)
        .then((res) => {
          console.log('Task Added Successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },[allToDoArray, fetchedData])

    function handleTaskClick(event) {
      //console.log("task Clicked")
      let taskIndex = event.target.id;
      setAllToDoArray((prevAllToDoArray) =>
        prevAllToDoArray.map((todo) => {
          if (allToDoArray.indexOf(todo) !== +taskIndex) return todo;
          else {
            return { ...todo, completed: !todo.completed };
          }
        })
      );
      setFetchedData((prevCount)=> prevCount+1);
    }
  
    const handleDisplay = (event) => {
      let { name } = event.target;
      if (name === "all") {
        setToDoArrayDisplay(allToDoArray.map((todo)=>(todo)))
      } else if (name === 'active') {
        setToDoArrayDisplay(allToDoArray.filter((todo)=>(!todo.completed)));
      } else if (name === 'completed') {
        setToDoArrayDisplay(allToDoArray.filter((todo)=>(todo.completed)));
      }
  
    };
  
    // Debug
    // console.log(newToDo);
    // console.log(allToDoArray);
    // console.log(displayTaskFlag);
    console.log(toDoArrayDisplay);
  
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-white">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      className="form-control add-task"
                      placeholder="New Task..."
                      value={newToDo}
                      onChange={handleChange}
                    />
                  </form>
  
                  <ul className="nav nav-pills todo-nav">
                    <li role="presentation" className="nav-item all-task active">
                      <Button
                        variant="link"
                        onClick={handleDisplay}
                        className="nav-link"
                        name="all"
                      >
                        All
                      </Button>
                    </li>
                    <li role="presentation" className="nav-item active-task">
                      <Button
                        variant="link"
                        onClick={handleDisplay}
                        className="nav-link"
                        name="active"
                      >
                        Active
                      </Button>
                    </li>
                    <li role="presentation" className="nav-item completed-task">
                      <Button
                        variant="link"
                        onClick={handleDisplay}
                        className="nav-link"
                        name="completed"
                      >
                        Completed
                      </Button>
                    </li>
                  </ul>
                  {toDoArrayDisplay.length?[...toDoArrayDisplay].reverse().map((todo)=>
                    <ToDoList key={toDoArrayDisplay.indexOf(todo)} id = {allToDoArray.indexOf(todo)} handleTaskClick={handleTaskClick} completed={todo.completed} toDoValue={todo.toDoValue} toDoCreated={todo.date}/>):"No Task"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ToDo