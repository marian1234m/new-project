import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'username', headerName: 'Username', width: 130 },
  {field: 'email', headerName: 'Email', width: 300},
];
// { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 }


export default function UsersGrid(props) {
  return (
   
   <div style={{ height: 400, width: '100%' }}>
      <DataGrid

        rows={props.users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}