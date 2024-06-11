import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({rows, columns, pageSize = 8}) => {
  const StyledDataGrid = styled(DataGrid)(({theme}) => ({
    color:
      theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-columnHeader': {
      fontSize: 16,
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
      borderRight: `1px solid ${
        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `1px solid ${
        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
    '& .MuiDataGrid-cell': {
      color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    },
    '& .allergy': {
      backgroundColor: theme.palette.mode === 'light' ? '#fcd4da' : '#e8a1a1',
      borderColor: theme.palette.mode === 'light' ? '#fcd4da' : '#e8a1a1',
    }
  }));

  return (
    <StyledDataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: pageSize,
          },
        },
      }}
      pageSizeOptions={[pageSize, pageSize * 2]}
      autoHeight
      getRowClassName={(params) => {
        const {allergies} = params.row;
        return (allergies && allergies !== 'None') ? 'allergy' : '';
      }}
    />
  );

};

export default Table;