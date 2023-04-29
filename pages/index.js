import React from 'react';
import Homepage from "./Homepage"
import CourseList from './CourseList';


export default function App() {
  if (globalThis.window !== undefined) {
    import("jquery").then(() => {
      // Bootstrap CSS
      import("bootstrap/dist/css/bootstrap.min.css");
      // Bootstrap Bundle JS
      import("bootstrap/dist/js/bootstrap.bundle.min");
    });
  }

  return (
    // <Homepage />   
    <CourseList />
  );
}