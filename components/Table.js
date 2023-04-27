import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { ParseService } from '../services/ParseService';

import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit"
const { ExportCSVButton } = CSVExport


const Table = (props) => {
  const { constraints, updateCourseConstraint } = props

  const columns = [
    {
      dataField: 'courseId',
      text: 'Course ID',
      sort: true,
      editable: false,
    }, 
    {
      dataField: 'requisite',
      text: 'Course Requisite',
      sort: true,
      editable: true,
      editor: {
        type: Type.TEXTAREA
      }    
    }, 
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      editable: false,
      csvExport: false,
    }
  ];
  
  function afterSaveCell(oldValue, newValue, row, column) {
    console.log("huray")
    console.log({oldValue, newValue, row, column})
    updateCourseConstraint(row.courseId, newValue)
  }
  
  function beforeSaveCell(oldValue, newValue, row, column, done) {
    setTimeout(() => {
      if (oldValue === newValue) {
        done(false)
        return
      }

      if (ParseService.validate(newValue) === true) {
        done(true);
        return
      }
      
      let error = ParseService.parse(newValue).error
      if (confirm(`Invalid input: ${error}\nDo you want to accept this change?`)) {
        done(true);
      } else {
        done(false);
      }
    }, 0);
    return { async: true };
  }

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      // let status = row.status
      // if (status === "Valid") return
      // else alert(status)
      // console.log(`clicked on row with index: ${rowIndex}`);
    },
    onMouseEnter: (e, row, rowIndex) => {
      // console.log(`enter on row with index: ${rowIndex}`);
    }
  };
  
  const MyBootstrapTable = (props) => (
    <BootstrapTable 
      { ...props }
      keyField='courseId' data={ constraints } columns={ columns } 
      cellEdit={ cellEditFactory({
        mode: 'click',
        blurToSave: true,
        beforeSaveCell: beforeSaveCell,
        afterSaveCell: afterSaveCell, 
      }) }
      noDataIndication={<div><p>Table is empty.</p><p>You can <b><i>Import CSV</i></b> files, make change if needed and <b><i>Commit</i></b> change </p></div>}
      rowEvents={ rowEvents }
      bootstrap4
      striped hover condensed />
  )

  return (
    <ToolkitProvider
      keyField="courseId"
      data={ constraints }
      columns={ columns }
      exportCSV
    >
      {
        props => (
          <>
            <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
            <hr />
            <MyBootstrapTable { ...props.baseProps } />
          </>
        )
      }
    </ToolkitProvider>
  )

}

export default Table;
