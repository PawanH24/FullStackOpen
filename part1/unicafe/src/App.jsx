import { useState } from "react";

const Header = (props) => <h1>{props.text}</h1>;

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.data.total !== 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={props.data.good} />
          <StatisticLine text="neutral" value={props.data.neutral} />
          <StatisticLine text="bad" value={props.data.bad} />
          <StatisticLine text="all" value={props.data.total} />
          <StatisticLine text="average" value={props.data.average} />
          <StatisticLine text="positive" value={`${props.data.positive} %`} />
        </tbody>
      </table>
    );
  } else {
    return <p>No feedback given</p>;
  }
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics data={{ good, neutral, bad, total, average, positive }} />
    </div>
  );
};

export default App;
