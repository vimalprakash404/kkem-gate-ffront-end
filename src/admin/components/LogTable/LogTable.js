import React from 'react';
import Card from 'react-bootstrap/Card';
import LogBadge from './LogBadge';

const LogTable = ({ data  , title}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title className='table-title text-primary'><h2>{title} </h2></Card.Title>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className='table-primary'>
              <tr>
                {Object.keys(data[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.entries(row).map(([key, value], cellIndex) => (
                    <td key={cellIndex}>
                      {key === 'action' ? <LogBadge data={value}/> : value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default LogTable;
