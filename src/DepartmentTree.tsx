import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DepartmentTree: React.FC = () => {
  const departments = [
    {
      department: 'customer_service',
      sub_departments: ['support', 'customer_success'],
    },
    {
      department: 'design',
      sub_departments: ['graphic_design', 'product_design', 'web_design'],
    },
  ];

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleAccordionChange = (panel: string) => (
    _event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {departments.map((department, index) => (
        <Accordion
          key={index}
          expanded={expanded === department.department}
          onChange={handleAccordionChange(department.department)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Checkbox edge="start" />
            <Typography>{department.department}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {department.sub_departments.map((subDept, subIndex) => (
                <ListItem key={subIndex}>
                  <Checkbox edge="start" />
                  <ListItemText primary={subDept} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default DepartmentTree;
