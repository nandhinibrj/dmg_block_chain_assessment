import {
  Box,
  Button,
  FormControl,
  FormGroup,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { MiningHardwareAPI } from "service/MiningHardwareAPI";
import { MiningHardware } from "types/model";
import { Close, Delete } from "@mui/icons-material";
import CustomField from "./CustomField";
import DialogModal from "./DialogModal";

const ManageMiningHardware = () => {
  const miningHardwareAPI = new MiningHardwareAPI();
  const [isFetching, setFetching] = React.useState<boolean>(false);
  const [miningHardwareData, setMiningHardwareData] = React.useState<
    MiningHardware[]
  >([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [action, setAction] = React.useState<string>();
  const [filteredMiningHardwareRecord, setFilteredMiningHardwareRecord] =
    React.useState<MiningHardware | undefined>();

  React.useEffect(() => {
    const getMiningHardwareData = async () => {
      setFetching(true);
      const results = await miningHardwareAPI
        .getMiningHardwares()
        .then((response) => response)
        .finally(() => setFetching(false));
      setMiningHardwareData(results as unknown as MiningHardware[]);
    };
    getMiningHardwareData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = React.useCallback(
    (update: Partial<MiningHardware>) =>
      filteredMiningHardwareRecord &&
      setFilteredMiningHardwareRecord({
        ...filteredMiningHardwareRecord,
        ...update,
      }),
    [filteredMiningHardwareRecord]
  );

  const handleDelete = (id: number) => {
    setMiningHardwareData(
      miningHardwareData.length > 1
        ? [
            ...miningHardwareData.slice(0, id - 1),
            ...miningHardwareData.slice(id),
          ]
        : []
    );
    miningHardwareAPI.deleteMiningHardware(id).then((res) => console.log(res));
  };

  const renderDelete = ({ id }: GridCellParams<MiningHardware>) => (
    <Button
      size="small"
      variant="outlined"
      startIcon={<Delete />}
      onClick={() => handleDelete(id as number)}
    >
      Delete
    </Button>
  );

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      headerClassName: "sticky-left",
      cellClassName: "sticky-left",
      width: 100,
    },
    {
      field: "name",
      headerName: "Mining H/W",
      headerClassName: "sticky-left",
      cellClassName: "sticky-left",
      width: 300,
    },
    {
      field: "location",
      headerName: "Location",
      width: 400,
    },
    {
      field: "hashRate",
      headerName: "Hash Rate",
      width: 400,
    },
    {
      field: "delete",
      headerName: "Action",
      cellClassName: "sticky-right",
      sortable: false,
      width: 200,
      renderCell: renderDelete,
    },
  ];

  const handleAdd = () => {
    setOpen(true);
    setAction("add");
    setFilteredMiningHardwareRecord({
      id: miningHardwareData.length + 1,
      name: "",
      location: "",
      hashRate: "",
    });
  };

  const handleUpdate = (mining_id: number) => {
    const filtered_record: MiningHardware = miningHardwareData.filter(
      ({ id }) => id === mining_id
    )[0];
    setFilteredMiningHardwareRecord(filtered_record);
    setOpen(true);
    setAction("update");
  };

  const handleSave = () => {
    if (filteredMiningHardwareRecord) {
      if (action === "update") {
        setMiningHardwareData([
          ...miningHardwareData.slice(0, filteredMiningHardwareRecord.id - 1),
          { ...filteredMiningHardwareRecord },
          ...miningHardwareData.slice(filteredMiningHardwareRecord.id),
        ]);
        miningHardwareAPI
          .updateMiningHardware(filteredMiningHardwareRecord)
          .then((res) => console.log(res));
      } else {
        setMiningHardwareData([
          ...miningHardwareData.slice(0, filteredMiningHardwareRecord.id - 1),
          { ...filteredMiningHardwareRecord },
          ...miningHardwareData.slice(filteredMiningHardwareRecord.id),
        ]);
        miningHardwareAPI
          .createMiningHardware(filteredMiningHardwareRecord)
          .then((res) => console.log(res));
      }
    }
    setOpen(false);
    setAction(undefined);
  };

  const handleDiscard = () => {
    setMiningHardwareData([...miningHardwareData]);
    setOpen(false);
    setAction(undefined);
  };

  const openDialog = () =>
    filteredMiningHardwareRecord && (
      <DialogModal
        open={open}
        dialogWidth="xl"
        setOpen={setOpen}
        titleSection={
          <Box
            display="flex"
            justifyContent="space-between"
            alignContent="center"
          >
            <Typography variant="h6" textTransform="capitalize">
              {action} {filteredMiningHardwareRecord.name}
            </Typography>
            <IconButton size="small" onClick={() => handleDiscard()}>
              <Close />
            </IconButton>
          </Box>
        }
        content={
          <Box
            component="form"
            sx={{
              "& .MuiDivider-root": { marginY: 1 },
              "& .MuiTextField-root": { m: 1, width: "25ch" },
              "& .MuiButton-root": { m: 1, width: "10ch" },
            }}
          >
            <FormGroup>
              <FormControl variant="standard">
                <CustomField
                  label="Mining H/W Id"
                  disabled
                  type="number"
                  value={String(filteredMiningHardwareRecord.id)}
                  onChange={(id: string) =>
                    save({ id: id as unknown as number })
                  }
                />
                <CustomField
                  required
                  label="Mining H/W Name"
                  value={filteredMiningHardwareRecord.name}
                  onChange={(name: string) => save({ name })}
                />
                <CustomField
                  required
                  label="Mining H/W Location"
                  value={filteredMiningHardwareRecord.location}
                  onChange={(location: string) => save({ location })}
                />
                <CustomField
                  required
                  label="Mining H/W Hash Rate"
                  value={filteredMiningHardwareRecord.hashRate}
                  onChange={(hashRate: string) => save({ hashRate })}
                />
              </FormControl>
            </FormGroup>
          </Box>
        }
        action={
          <>
            <Button onClick={handleDiscard}>Discard</Button>
            <Button onClick={handleSave}>Save</Button>
          </>
        }
      />
    );

  return (
    miningHardwareData && (
      <Box sx={{ height: 350, width: "100%", display: "grid", gap: 2 }}>
        <Box display="flex" justifyContent="flex-end">
          <Button size="small" onClick={handleAdd}>
            Create Mining H/W
          </Button>
        </Box>
        <DataGrid
          autoPageSize
          sx={{
            "& .MuiDataGrid-root .MuiDataGrid-cellContent": {
              whiteSpace: "normal !important",
              wordWrap: "break-word !important",
            },
            "& .sticky-left": {
              position: "sticky",
              left: 0,
              zIndex: (theme) => theme.zIndex.mobileStepper,
              background: (theme) => theme.palette.background.paper,
            },
            "& .sticky-right": {
              position: "sticky",
              right: 0,
              zIndex: (theme) => theme.zIndex.mobileStepper,
              background: (theme) => theme.palette.background.paper,
            },
          }}
          columns={columns}
          rows={miningHardwareData ?? []}
          loading={isFetching}
          rowCount={miningHardwareData.length}
          onRowSelectionModelChange={(row) => {
            console.log(row);
            handleUpdate(row[0] as number);
          }}
          rowHeight={35}
        />
        {filteredMiningHardwareRecord && openDialog()}
      </Box>
    )
  );
};

export default ManageMiningHardware;
