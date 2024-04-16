import { useQuery } from "@apollo/client";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import {
  GetDaySchedulesQuery,
  GetOrdersQuery,
  GetStockLevelsQuery,
} from "../gql/graphql";
import {
  GET_DAY_SCHEDULES,
  GET_ORDERS,
  GET_STOCK_LEVELS,
} from "../queries/queries";

const QuarryDetailsPage = () => {
  const { data, startPolling: startPollingStockLevel } =
    useQuery<GetStockLevelsQuery>(GET_STOCK_LEVELS);
  const { data: daySchedules } =
    useQuery<GetDaySchedulesQuery>(GET_DAY_SCHEDULES);

  const { data: orderData, startPolling } =
    useQuery<GetOrdersQuery>(GET_ORDERS);

  startPolling(2000);

  startPollingStockLevel(2000);

  return (
    <Box
      sx={{
        bgcolor: lightBlue[200],
        width: "100%", // Ensure it covers the width
        height: "100vh", // Adjust the height as needed, 100vh covers the full viewport height
      }}
    >
      <Container sx={{}}>
        <Typography variant="h2">Quarry View</Typography>
        <Typography variant="h4">Stock Levels</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">In Stock</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.stockLevels.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.itemName}
                  </TableCell>
                  <TableCell align="right">{row.quantity} tonnes</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h4">Day schedule</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell align="right">Hour Range</TableCell>
                <TableCell align="right">Max Capacity</TableCell>
                <TableCell align="right">Current Usage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {daySchedules?.daySchedules.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.day}
                  </TableCell>
                  <TableCell align="right">{row.hourRange}</TableCell>
                  <TableCell align="right">{row.maxCapacity} trucks</TableCell>
                  <TableCell align="right">{row.currentUsage} trucks</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h4">Orders</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="right">Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData?.orders.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.itemName}
                  </TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default QuarryDetailsPage;
