import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, i) => {
        return <Part key={'part-' + i} part={part} />;
      })}
    </div>
  );
};

const Total = (props) => {
  const totalExercises = props.exercises.reduce((a, c) => a + c, 0);
  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        parts={[
          { name: part1, exercises: exercises1 },
          { name: part2, exercises: exercises2 },
          { name: part3, exercises: exercises3 }
        ]}
      />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
