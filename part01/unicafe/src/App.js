import React, { useState } from 'react'

const Statistics = ({ good, neutral, bad, all, average, positivePercentage}) => {
  if (all > 0) {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={all} />
            <StatisticLine text='average' value={average} />
            <StatisticLine text='positive' value={positivePercentage + ' %'} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <div>No feedback given</div>
      </div>
    )
  }
}

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={() => setGood(good + 1)} text={"good"} />
      <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button onClick={() => setBad(bad + 1)} text={"bad"} />
      <h2>statistics</h2>
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positivePercentage={positive}
      />
    </div>
  )
}

export default App