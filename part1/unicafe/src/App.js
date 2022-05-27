import { useState } from "react";

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Header = ({ text }) => <h1>{text}</h1>;

const StatisticLine = ({ text, value }) => (
  <tr>
    <th>{text}</th>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ stats }) => {
  if (stats.all == 0) {
    return <p>No feedback given</p>;
  }

  let rows = [];
  for (let row in stats) {
    rows.push(<StatisticLine key={row} text={row} value={stats[row]} />);
  }
  return (
    <table>
      <tbody>{rows}</tbody>
    </table>
  );
};

const App = () => {
  // State is saved as a single object
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const setGood = () => {
    setFeedback((feedback) => ({
      ...feedback,
      good: feedback.good + 1,
    }));
  };

  const setNeutral = () => {
    setFeedback((feedback) => ({
      ...feedback,
      neutral: feedback.neutral + 1,
    }));
  };

  const setBad = () => {
    setFeedback((feedback) => ({
      ...feedback,
      bad: feedback.bad + 1,
    }));
  };

  const getStat = ({ good, neutral, bad }) => ({
    good,
    neutral,
    bad,
    all: good + neutral + bad,
    average: (good + neutral * 0 + bad * -1) / (good + neutral + bad),
    positive: `${(good / (good + neutral + bad)) * 100} %`,
  });

  return (
    <div>
      <Header text="Give feedback" />
      <div>
        <Button text="good" onClick={setGood} />
        <Button text="neutral" onClick={setNeutral} />
        <Button text="bad" onClick={setBad} />
      </div>
      <Header text="Statistics" />
      <Statistics stats={getStat(feedback)} />
    </div>
  );
};

export default App;
