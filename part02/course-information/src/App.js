import React from 'react';

const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ course }) => {
  const total = course.parts.reduce((s, p) => s += p.exercises, 0)
  return(
    <strong>Total of {total} exercises</strong>
  ) 
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>    
)

const Content = ({ course }) => course.parts.map(part => <Part part={part} />)

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
)

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  return courses.map(course => <Course course={course} />)
}


export default App;
