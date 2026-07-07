const Header = (props) => {
  return <h1>{props.name}</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} ex={part.exercises} />
      ))}
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

const Total = ({ parts }) => {
  const total = parts.reduce((acc, part) => acc + part.exercises, 0);

  return <p>total of {total} exercises </p>;
};

function Course({ course }) {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
}

function AllCourse({ courses }) {
  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
}

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <AllCourse courses={courses} />;
};

export default App;
