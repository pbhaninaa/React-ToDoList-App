import * as React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTask] = useState([])
  const [selected, setSelected] = useState('')
  const [priorities, setPriorities] = useState('');
  const [priority, setPriority] = useState(['High', 'Medium', 'Low'])
  const [seconds, setSeconds] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  

  useEffect(() => {
    fetchData();
    handleClock();
    const interval = setInterval(handleClock, 1000);
    return () => clearInterval(interval);
  }, [seconds])


  const fetchData = () => {
    fetch("http://localhost:8080/todos/getAll")
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        setTask(data)
      })    
      
  }

  const deleteById = (task) => {
    
    fetch(`http://localhost:8080/todos/delete/${task.id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error("Error deleting:", error);
      });
  };

  const deleteAll = () => {
    fetch("http://localhost:8080/todos/deleteAll", {
      method: "DELETE"
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error("Error deleting:", error);
      });

    fetchData();
  };



  const data = {
    todo: inputValue,
    priority: priorities,
    ststus: false
  }
  const saveTodo = () => {
    if (data.todo != '' || data.priority != '') {
      fetch("http://localhost:8080/todos/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          fetchData();
          setInputValue('')
          setPriorities("Select")
        })
        .catch(error => {
          console.error("Error creating todo:", error);
        });
    }
    else {
      alert("Check your inputs")
    }
  };
  //   const [_status, _setStatus] = useState({ status: true });
  //  // _setStatus(prevTasking => ({
  //     //   ...prevTasking,
  //     //   status: !prevTasking.status
  //     // }));
  //     // let data = {
  //     //   todo: task.todo,
  //     //   status: _status.status,
  //     //   priority: task.priority

  //     // }

  //     // console.log(data);
  const handleCheck = (task) => {  
    const updatedTask = { ...task, status: !task.status }; // Toggle the status
   
    console.log(updatedTask)
    fetch(`http://localhost:8080/todos/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedTask)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
      })
      .then(data => {
        console.log("Updated task:", data);
        // You can update your task list or perform other actions as needed
      })
      .catch(error => {
        console.error("Error updating:", error);
      });
    fetchData();
  };




  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleOptionChange = (event) => {
    setPriorities(event.target.value)
  }
  function handleClock() {
    const now = new Date();
    setDate(now.getDate() + "/" + 
    (now.getMonth()+1)   + "/" + 
    now.getFullYear());

    setSeconds(now.getSeconds());

    setTime(`${now.getHours()}:
    ${now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes()}:
    ${now.getSeconds()}`);
  }
  return (
    <div className="App">
      {tasks.length > 0 && (
        <div className="tasks">
          <h4>LIST OF TASK TO BE DONE</h4>
          <input type="button" id='deleteAll' value='Delete All' onClick={deleteAll} />
          <div className='heard'>
            <div className='dividetask' id='TaskCol'><p>Task</p></div>
            <div className='dividetask' id='statusCol'><p>Status</p></div>
            <div className='dividetask' id='statusCol'><p>Priority</p></div> <div className='dividetask'><p>Check if done</p></div>
            <div className='dividetask' id='BtnCol'><p>Remove</p></div>
          </div>
          {tasks.map(task => (
            <div className='task' key={task.id}>
              <div className='dividetask' id='TaskCol'><h5>{task.todo}</h5> </div>
              <div className='dividetask' id='statusCol'><h5>{task.status ? "Done" : "Pending"}</h5> </div>
              <div className='dividetask' id='statusCol'><h5>{task.priority == 'Select' ? 'Not Set' : task.priority}</h5>
              </div>  <div className='dividetask'>
                <input type="checkbox" value={task.status} onChange={() => handleCheck(task)} />
              </div>
              <div className='dividetask' id='BtnCol'><h5><input type="button" value='Delete' onClick={() => deleteById(task)} /></h5>
              </div>
            </div>
          ))}
        </div>      

      )}
       <span className="time">       
          <h5>Date : {date}</h5>
          <h5>Time : {time}</h5>
        </span>
      <select className="select" value={priorities} onChange={handleOptionChange}>
        <option >
          Select priority of the task you are adding
        </option>
        {priority.map(priority => (
          <option key={priority}  >
            {priority}
          </option>
        ))}
      </select>
      <div className="container" >
        <input type="text" placeholder={"Enter Task to be done. "} value={inputValue} onChange={handleInputChange} />
        <input type="submit" value="Save" onClick={saveTodo} />
      </div>
      <div>
        <h3>SAVE THE TASKS THAT YOU WILL BE DOING TODAY.</h3>
        
      </div>

    </div>
  );
}

export default App;