import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const Display = ({ text }) => <p>{text}</p>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0); // selected is the index
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0));
  const randAnecdote = () => {
    setSelected(() => Math.floor(Math.random() * anecdotes.length));
  };

  const voteAnecdote = () => {
    setVote(() => [
      ...vote.slice(0, selected),
      vote[selected] + 1,
      ...vote.slice(selected + 1),
    ]);
  };

  const mostVoted = () => {
    if (vote.every((item) => item === 0)) {
      return "Start voting to display the most voted anecdote";
    }
    return anecdotes[
      vote.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0)
    ];
  };

  return (
    <div>
      <Header text="Anecdotes of the Day" />
      <Display text={anecdotes[selected]} />
      <br />
      <div>
        <Button onClick={voteAnecdote} text="Vote" />
        <Button onClick={randAnecdote} text="Next anecdote" />
      </div>
      <br />
      <Header text="Most Voted Anecdote" />
      <Display text={mostVoted()} />
    </div>
  );
};

export default App;
