import React, {useEffect, useState} from 'react';
import Table from "../components/Table"
import LoadingButton from "../components/LoadingButton"
import data from "../data.js"
import { ParseService } from "../services/ParseService"
import FileInput from '../components/FileInput';

const updateDB = async (payload) => {
  return fetch("api/requisites", {
      method: "POST",
      body: JSON.stringify(payload),
  }).then(res => res.json())
}

const prepareCourseWithStatus = course => ({...course, status: ParseService.validate(course.requisite) ? "Valid" : (
  "Invalid: " + ParseService.parse(course.requisite).error
)})


const CourseList = () => {
  const [constraints, setConstraints] = useState(() => {
    return []
    // return data.constraints.map(prepareCourseWithStatus)
  });

  const [loading, setLoading] = useState(false);

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

  const prepareRequest = async (constraints, checkURL) => {
      let parsedConstraints = []
      for (let c of constraints) {
        const parseResult = ParseService.parse(c.requisite)

        if (parseResult.error) throw `${c.courseId}: ${parseResult.error}`
        
        // TODO: handle empty string
        if (parseResult.data == "") {
          parsedConstraints.push({
              courseId: c.courseId,
              condition: null,
          })
        } else {
          parsedConstraints.push({
              courseId: c.courseId,
              condition: JSON.parse(parseResult.data),
          })
        }
      }
      return {head: checkURL, tail: parsedConstraints}
  }

  const onCommit = async () => {
      const connected = (datas) => {
        if (datas.data === true) alert("Success")
        else {
          console.warn("Server response:", JSON.stringify(datas))
          console.log(datas)
          let msg = datas.error.description || datas.error.reason || datas.error.code || ""
          alert("Operation failed. " + msg)
        }
      }

      if (confirm("You want to commit these constraints?")) {
        let customCheckUrl = prompt("Custom check-service: ", "http://localhost:8000")
        setLoading(true)
        await prepareRequest(constraints, customCheckUrl)
          .then(updateDB)
          .then(connected)
          .catch((e) => {
            console.warn(e)
            alert("Unknown Error")
          })

        setLoading(false)
      }
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
            <LoadingButton title="Clear" loading={false} onClick={onClearData} />
            <LoadingButton title="Commit" loading={loading} onClick={onCommit} />
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
