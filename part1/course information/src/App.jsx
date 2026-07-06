const Header = (props) => {
  return <h1>{props.name}</h1>;
};

const Content = (prop) => {
  return (
    <div>
      <Part part={prop.parts[0].name} ex={prop.parts[0].exercises} />
      <Part part={prop.parts[1].name} ex={prop.parts[1].exercises} />
      <Part part={prop.parts[2].name} ex={prop.parts[2].exercises} />
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.ex}
    </p>
  );
};

const Total = (prop) => {
  return (
    <p>
      Number of exercises{" "}
      {prop.parts[0].exercises +
        prop.parts[1].exercises +
        prop.parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
