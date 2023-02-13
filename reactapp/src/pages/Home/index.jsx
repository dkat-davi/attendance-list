import React, { useState, useEffect } from 'react';
import './style.css';

import { Card } from '../../components/card';

export function Home() {
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: ''})

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect( () => {
    fetch("https://api.github.com/users/dkat-davi")
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    })
  }, [])

  return (
    <div className='container'>
      
      <header>
        <h1>Attendance List</h1>
        <div>
          <strong><small>{ user.name }</small></strong>
          <img src={ user.avatar } alt="profile-photo" />
        </div>
      </header>

      <input 
        type="text" 
        placeholder="Type your name"
        onChange={e => setStudentName(e.target.value)}  
      />

      <button 
        type="button"
        onClick={handleAddStudent}>
        Save
      </button>

      {
        students.map(student => 
          <Card 
            key={student.time}
            name={student.name} 
            time={student.time}
          /> 
        )        
      }
    </div>
  )
  
}


