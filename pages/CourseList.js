import React, {useEffect, useState} from 'react';
import Table from "../components/Table"
import data from "../data.js"
import { ParseService } from "../services/ParseService"


const CourseList = () => {
  const [constraints, setConstraints] = useState([]);
  
  const prepareCourseWithStatus = course => ({...course, status: ParseService.validate(course.requisite) ? "Valid" : (
    "Invalid: " + ParseService.parse(course.requisite).error
  )})

  useEffect(() => {
    loadData().then(courses => {
      if (!courses) return
      let coursesWithStatus = courses.map(c => prepareCourseWithStatus(c))
      setConstraints(coursesWithStatus)
    }).catch(e => {
      console.error(e)
    })
  }, [])

  useEffect(() => {
    console.log({constraints})
  }, [constraints])

  const loadData = async() => {
    // TODO
    return data.constraints
  }
  
  const updateCourseRequisite = (courseId, newRequisite) => {
    setConstraints(prev => {
      return prev.map(c => {
        if (c.courseId !== courseId) return c
        else return prepareCourseWithStatus({...c, requisite: newRequisite})
      })
    })
  }

  return (
    <div>
      <div>
        <h1>Manage <i>Course-Constraint</i></h1>
        <button onClick={() => alert("Upload CSV")}>Upload CSV</button>
        <button onClick={() => alert("Commit")}>Commit</button>
        {/* <button onClick={() => alert("Add New Constraint")}>Add New Constraint</button> */}
      </div>

      <Table constraints={constraints} updateCourseConstraint={updateCourseRequisite} />
    </div>
  );
}

export default CourseList;
