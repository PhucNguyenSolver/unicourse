import React, {useEffect, useState} from 'react';
import Table from "../components/Table"
import data from "../data.js"
import { ParseService } from "../services/ParseService"
import FileInput from '../components/FileInput';


const CourseList = () => {
  const [constraints, setConstraints] = useState([]);
  
  const prepareCourseWithStatus = course => ({...course, status: ParseService.validate(course.requisite) ? "Valid" : (
    "Invalid: " + ParseService.parse(course.requisite).error
  )})

  // useEffect(() => {
  //   loadData().then(courses => {
  //     if (!courses) return
  //     let coursesWithStatus = courses.map(c => prepareCourseWithStatus(c))
  //     setConstraints(coursesWithStatus)
  //   }).catch(e => {
  //     console.error(e)
  //   })
  // }, [])

  useEffect(() => {
    console.log({constraints})
  }, [constraints])

  const loadData = async() => {
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

  const onClearData = (data) => {
    setConstraints([])
  }

  const onDataAvailable = (courses) => {
    setConstraints(courses.map(prepareCourseWithStatus))
  }

  const onCommit = () => {
    alert("Commit")
  }

  return (
    <div className='container'>
      <div >
        <h1>Manage <b>Course-Constraint</b></h1>
        <div style={styles.tableHeader}>
          <div style={{display: "flex", flexDirection: "column"}}>
            <FileInput 
              onDataSuccess={onDataAvailable} 
              onDataError={err => alert(err)}
            />
          </div>
          <div>
            <button onClick={onClearData}>Clear</button>
            <button onClick={onCommit}>Commit</button>
          </div>
        </div>
      </div>

      <Table items={constraints} updateListItems={updateCourseRequisite} />
    </div>
  );
}

const styles = {
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "pink"
  }
}
export default CourseList;
