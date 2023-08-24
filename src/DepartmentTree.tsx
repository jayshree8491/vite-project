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

  const handleSelect = (_event: React.ChangeEvent<HTMLInputElement>, nodeId: string) => {
    const updatedSelected = new Set(selected);

    // Toggle the selection of the clicked node
    if (updatedSelected.has(nodeId)) {
      updatedSelected.delete(nodeId);
    } else {
      updatedSelected.add(nodeId);
    }

    // Select all sub-departments when selecting a department
    const department = data.find((dept) => dept.department === nodeId);
    if (department && updatedSelected.has(nodeId)) {
      department.sub_departments.forEach((subDept) => {
        updatedSelected.add(subDept);
      });
    } else {
      // Unselect all sub-departments when unselecting a department
      department?.sub_departments.forEach((subDept) => {
        updatedSelected.delete(subDept);
      });
    }

    setSelected(Array.from(updatedSelected));
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
                checked={
                  selected.includes(dept.department) ||
                  dept.sub_departments.every((subDept) => selected.includes(subDept))
                }
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
