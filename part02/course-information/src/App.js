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

const Content = ({ course }) => (
  <div>
    <Part part={course.parts[0]} />
    <Part part={course.parts[1]} />
    <Part part={course.parts[2]} />
  </div>
)

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }
  console.log(course)
  return <Course course={course} />
}


export default App;
