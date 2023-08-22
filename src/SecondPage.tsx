import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DepartmentTree from './DepartmentTree';
import { Link } from 'react-router-dom';


interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Department {
  department: string;
  sub_departments: string[];
}


const SecondPage: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'body', headerName: 'Body', flex: 1 },
  ];

  const departments: Department[] = [
    {
      department: 'customer_service',
      sub_departments: ['support', 'customer_success'],
    },
    {
      department: 'design',
      sub_departments: ['graphic_design', 'product_design', 'web_design'],
    },
    {
      department: 'Agriculture & Fishing',
      sub_departments: ['Agriculture', 'Crops', 'Farming animals & Livestock', 'Fishery & Aquaculture', 'Ranching'],
    },
    {
      department: 'Business Services',
      sub_departments: ['Accounting & Accounting Services', 'Auctions', 'Business Services-General', 'Call Center & Business Centers', 'Career Planning', 'Career', 'Commercial Printing','Debt Collection'],
    },    // Add more departments and sub-departments as needed
  ];

  return (
    <div style={{ padding: '20px', height: 400, width: '95%' }}>
      <h1>My Data List</h1>
      <DataGrid rows={data} columns={columns} autoPageSize={true}/>
      <Link to="/">Go Back to First Page</Link>
      <h2>Select Departments</h2>
      <div style={{width:'50%', height:'200', display:'block'}}>
      <DepartmentTree data={departments} />
    </div>
    </div>
  );
};

export default SecondPage;
