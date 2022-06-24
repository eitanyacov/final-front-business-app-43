import { DataGrid } from "@mui/x-data-grid";

const DashboardDataGrid = () => {

    const dailyIncomes = []
    const columns = [
        { field: "id", headerName: "ID", headerAlign: 'center', width: 60 },
        {
          field: "date",
          headerName: "תאריך",
          width: 110,
          align: "center",
          headerAlign: 'center',          
          editable: true,
        },
        {
          field: "cashMoney",
          headerName: "רווח תפעולי",
          width: 90,
          align: "center",
          headerAlign: 'center',
          editable: true,
        },
        {
          field: "creditCard",
          headerName: "רווח גולמי",
          width: 80,
          align: "center",
          headerAlign: 'center',
          editable: true,
        },
        {
          field: "cheque",
          headerName: "הכנסות",
          align: "center",
          headerAlign: 'center',
          // type: 'number',
          width: 80,
          editable: true,
        },
    
        {
          field: "cibus",
          headerName: "משכורות",
          align: "center",
          headerAlign: 'center',
          width: 80,
          editable: true,
        },
        {
          field: "tenBis",
          headerName: "הוצאות משתנות",
          width: 120,
          align: "center",
          headerAlign: 'center',
          editable: true,
        },
        {
            field: "wallt",
            headerName: "הוצאות קבועות",
            align: "center",
            headerAlign: 'center',
            width: 120,
            editable: true,
          },
          {
            field: "other",
            headerName: "הוצאות ספקים",
            align: "center",
            headerAlign: 'center',
            width: 120,
            editable: true,
          },
          {
            field: "total",
            headerName: 'חודש',
            align: "center",
            headerAlign: 'center', 
            width: 70,
            editable: true,
          },
      ];
  return (
    <div className="h-[300px] w-[95%] mt-5 mb-5 mx-auto">
        <DataGrid
          rows={dailyIncomes}
          columns={columns}
          pageSize={30}
          rowsPerPageOptions={[30]}
          checkboxSelection
          disableSelectionOnClick
        //   onCellDoubleClick={param => editCell(param)}
          // onRowClick={(params) => goToPage(params.id)}
          className="cursor-pointer"
        />
    </div>
  )
}

export default DashboardDataGrid