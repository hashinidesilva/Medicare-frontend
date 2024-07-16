import {DataGrid} from '@mui/x-data-grid';

const Table = ({rows, columns, pageSize = 10, hideFooter = false}) => {
  const styles = {
    color: 'rgba(0,0,0,.85)',
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
      backgroundColor: '#fafafa',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-columnHeader': {
      fontSize: 16,
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
      borderRight: `1px solid #f0f0f0`,
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `1px solid #f0f0f0`,
    },
    '& .MuiDataGrid-cell': {
      color: 'rgba(0,0,0,.85)',
    },
    '& .MuiPaginationItem-root': {
      borderRadius: 0,
    },
    '& .allergy': {
      backgroundColor: '#fcd4da',
      borderColor: '#fcd4da',
    },
  };

  const updatedColumns = columns.map((column) => ({
    ...column,
    sortable: false,
  }));

  return (
      <DataGrid
          rows={rows}
          columns={updatedColumns}
          initialState={!hideFooter && {
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
          hideFooter={hideFooter}
          sx={styles}
          rowHeight={40}
      />
  );

};

export default Table;