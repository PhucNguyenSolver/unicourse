import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { ParseService } from '../services/ParseService';
import ToolkitProvider, { CSVExport } from "react-bootstrap-table2-toolkit"

const { ExportCSVButton } = CSVExport

const Table = (props) => {
  const { items, updateListItems } = props

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
    updateListItems(row.courseId, newValue)
  }
  
  const MyBootstrapTable = (props) => (
    <BootstrapTable 
      { ...props }
      keyField='courseId' data={ items } columns={ columns } 
      cellEdit={ cellEditFactory({
        mode: 'click',
        blurToSave: true,
        afterSaveCell: afterSaveCell, 
      }) }
      noDataIndication={<div><p>Table is empty.</p><p>You can <b><i>Import CSV</i></b> files, make change if needed and <b><i>Commit</i></b> to database </p></div>}
      bootstrap4
      striped hover condensed />
  )

  return (
    <ToolkitProvider
      keyField="courseId"
      data={ items }
      columns={ columns }
      exportCSV
    >
      {
        props => (
          <>
            <MyBootstrapTable { ...props.baseProps } />
            <hr />
            <ExportCSVButton {...props.csvProps} style={styles.button}>Export CSV</ExportCSVButton>
          </>
        )
      }
    </ToolkitProvider>
  )

}

const styles = {
  button: {
    border: "solid",
  }
}

export default Table;
