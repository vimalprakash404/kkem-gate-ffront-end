import React from "react";

const SelectBox = ({ assessment, handleSelectChange, selectRef }) => {
  return (
    <select className="custom-select custom-select-lg mb-3" onChange={handleSelectChange} ref={selectRef} id="select_box">
      <option key="-1">Select Test</option>
      {assessment.map((item) =>
        <option value={item["id"]} key={item._id}>{item["Test Name"]}</option>
      )}
    </select>
  );
}



export default SelectBox;