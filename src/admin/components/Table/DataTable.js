import React from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faPlus, faPencil, faTrash , faEye } from '@fortawesome/free-solid-svg-icons';
const DataTable = ({ data, title, add, addOnClick , edit , remove , handleRemove , handleEdit , view , handleView}) => {
  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + data.map(row => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  };
  if (typeof (data) !== "object") {
    return (<div>
    
    </div>)
  }

  return (

    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title className='table-title text-primary'><h2>{title}</h2></Card.Title>
          <div>{add && <button className="btn btn-primary" onClick={addOnClick}><FontAwesomeIcon icon={faPlus} /> Add</button>}
            {edit && <button className="btn btn-primary" onClick={exportToCSV} style={{ fontSize: "15px" }}><FontAwesomeIcon icon={faFileExport} /></button>}
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className='table-primary'>
              <tr>
                {Object.keys(data[0]).map((key, index) => (
                  key !== 'id' && <th key={index}>{key}</th>
                ))}
                {(edit === true || remove === true || view===true) &&
                <th>
                  Actions
                </th>}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.entries(row).map(([key, value], cellIndex) => (
                    key !== 'id' && // Skip rendering 'Test id' column
                    <td key={cellIndex}>
                      {key === 'Created at' ? new Date(value).toDateString()  :key==="Status" ?<span class={value==="pending"? "badge badge-pill badge-danger" : "badge badge-pill badge-success"}>{value}</span>: value}
                    </td>
                  ))}
                 {edit === true || remove === true|| view===true ? 
                  <td>
                    {edit===true ? <button className="btn btn-primary" onClick={()=>handleEdit(row)}><FontAwesomeIcon icon={faPencil} /> </button> : ""}  
                    {remove===true ?<button className="btn btn-danger" style={{ width: "50px" }} onClick={()=>handleRemove(row['id'])}><FontAwesomeIcon icon={faTrash} /> </button>: ""} 
                    {view===true && <button className="btn btn-success" style={{ width: "50px" }} onClick={()=>handleView(row['id'])}><FontAwesomeIcon icon={faEye} /> </button>}
                  </td>: ""}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DataTable;
