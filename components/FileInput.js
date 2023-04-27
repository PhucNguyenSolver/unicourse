import React from "react"
import Papa from "papaparse"

const FileInput = ({onDataSuccess, onDataError=() => {}}) => {

    const tryParseData = (data) => {
      try {
        return data.map(row => {
          let courseId = row[0]
          let requisite = row[1]
          return { courseId, requisite }
        })
      } catch {
        return null
      }
    }

    const handleFileChange = (e) => {
        const files = e.target.files
        console.log(files)
        if (files) {
            console.log(files[0])
            Papa.parse(files[0], {
                complete: function (results) {
                    // console.log("Result:", results)
                    console.log("Data:", results.data)
                    let parsed = tryParseData(results.data)
                    if (parsed === null) onDataError("Invalid CSV format")
                    else onDataSuccess(parsed)
                },
            })
        }
    }

    return (
        <span>
            <input type="file" name="myFile" onChange={handleFileChange} />
        </span>
    )
}

export default FileInput
