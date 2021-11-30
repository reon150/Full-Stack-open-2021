const Total = ({ course }) => {
  const total = course.parts.reduce((s, p) => s += p.exercises, 0)
  return(
    <strong>Total of {total} exercises</strong>
  ) 
}

export default Total;