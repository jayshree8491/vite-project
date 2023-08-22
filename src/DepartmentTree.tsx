import React, { useState } from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';



interface DepartmentProps {
  data: {
    department: string;
    sub_departments: string[];
  }[];
}

const DepartmentTree: React.FC<DepartmentProps> = ({ data }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>, nodeId: string) => {
    let updatedSelected: string[]=[...selected];
  
    // If a parent department is selected, select all its sub-departments
    if (data.some((dept) => dept.department === nodeId)) {
      const parentDept = data.find((dept) => dept.department === nodeId);
      if (parentDept) {
        const subDepartments = parentDept.sub_departments;
        updatedSelected = event.target.checked
          ? [...selected, nodeId, ...subDepartments]
          : selected.filter((id) => !subDepartments.includes(id) && id !== nodeId);
      }
    } else {
      // If a sub-department is selected, update the parent department selection
      updatedSelected = selected.includes(nodeId)
        ? selected.filter((id) => id !== nodeId)
        : [...selected, nodeId];
      data.forEach((dept) => {
        if (
          dept.sub_departments.includes(nodeId) &&
          dept.sub_departments.every((subDept) => updatedSelected.includes(subDept))
        ) {
          updatedSelected = updatedSelected.includes(dept.department)
            ? updatedSelected.filter((id) => id !== dept.department)
            : [...updatedSelected, dept.department];
        }
      });
    }

    setSelected(updatedSelected);
  };

  return (
    <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
      {data.map((dept) => (
        <TreeItem
          key={dept.department}
          nodeId={dept.department}
          label={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={selected.includes(dept.department)}
                onChange={(e) => handleSelect(e, dept.department)}
              />
              {dept.department}
            </div>
          }
        >
          {dept.sub_departments.map((subDept) => (
            <TreeItem
              key={subDept}
              nodeId={subDept}
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    checked={selected.includes(subDept)}
                    onChange={(e) => handleSelect(e, subDept)}
                  />
                  {subDept}
                </div>
              }
            />
          ))}
        </TreeItem>
      ))}
    </TreeView>
  );
};

export default DepartmentTree;