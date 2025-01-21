import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface IData {
  sci: number;
  time: number;
  availability: string;
  details: {
    cpu: {
      usage: number;
      time: number;
      frequency: number;
    };
    memory: {
      energy: number;
      used: number;
    };
    network: {
      io: number;
      connections: number;
    };
  };
}

function createData(sci: number, time: number, availability: string) {
  const row: IData = {
    sci,
    time,
    availability,
    details: {
      cpu: {
        usage: Number((Math.random() * 100).toFixed(2)),
        time: Math.floor(Math.random() * 10000),
        frequency: Number((Math.random() * 3 + 2).toFixed(2))
      },
      memory: {
        energy: Number((Math.random() * 1000).toFixed(2)),
        used: Math.floor(Math.random() * 1000000)
      },
      network: {
        io: Number((Math.random() * 100).toFixed(2)),
        connections: Math.floor(Math.random() * 50)
      }
    }
  };
  return row;
}

function Row({ row }: { row: IData }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.sci}</TableCell>
        <TableCell align="right">{row.time}</TableCell>
        <TableCell align="center">{row.availability}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Typography variant="subtitle1">CPU</Typography>
              <ul>
                <li>Usage: {row.details.cpu.usage} %</li>
                <li>Time: {row.details.cpu.time} μs</li>
                <li>Frequency: {row.details.cpu.frequency} GHz</li>
              </ul>
              <Typography variant="subtitle1">Memory</Typography>
              <ul>
                <li>Energy: {row.details.memory.energy} μJ</li>
                <li>Used: {row.details.memory.used} Bytes</li>
              </ul>
              <Typography variant="subtitle1">Network</Typography>
              <ul>
                <li>IO: {row.details.network.io} B/s</li>
                <li>Connections: {row.details.network.connections}</li>
              </ul>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    sci: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    availability: PropTypes.string.isRequired,
    details: PropTypes.shape({
      cpu: PropTypes.shape({
        usage: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired,
        frequency: PropTypes.string.isRequired
      }).isRequired,
      memory: PropTypes.shape({
        energy: PropTypes.string.isRequired,
        used: PropTypes.number.isRequired
      }).isRequired,
      network: PropTypes.shape({
        io: PropTypes.string.isRequired,
        connections: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

const rows: Array<IData> = [
  createData(12.33, 4500, '++'),
  createData(14.12, 5200, '+'),
  createData(10.89, 4300, '+++')
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>SCI</TableCell>
            <TableCell align="right">Est. Time (s)</TableCell>
            <TableCell align="center">Availability</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
