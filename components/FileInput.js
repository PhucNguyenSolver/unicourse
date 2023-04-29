import React from "react"
import Papa from "papaparse"

const FileInput = ({onDataSuccess, onDataError=() => {}}) => {

    const tryParseData = (data) => {
        try {
            const result = data.slice(1).map((row) => {
                let courseId = row[0]
                let requisite = row[1]
                return { courseId, requisite }
            })
            return result.filter((c) => c.courseId != "")
        } catch {
            return null
        }
    }

    const handleFileChange = (e) => {
        const fileObj = e.target.files && e.target.files[0]
        if (!fileObj) return

        Papa.parse(fileObj, {
            complete: function (results) {
                let parsed = tryParseData(results.data)
                if (parsed === null) onDataError("Invalid CSV format")
                else onDataSuccess(parsed)
                e.target.value = null
            },
        })
    }

    return (
        <span>
            <label htmlFor="upload-file" style={styles.label}>Import CSV</label>
            <input accept=".csv" type="file" name="myFile" onChange={handleFileChange} id="upload-file" hidden />
        </span>
    )
}

const styles = {
  label: {
    cursor: "pointer",
    border: "solid",
    padding: "1px 6px"
  }
}
export default FileInput
