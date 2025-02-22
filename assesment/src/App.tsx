import { useState, useEffect } from "react";
import { fetchData, DataItem } from "./api/api";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Card,
  CardContent
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [data, setData] = useState<DataItem[]>([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/data`, { name, value: parseFloat(value) });
      setData([...data, response.data]);
      setName("");
      setValue("");
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <Box sx={{ bgcolor: '#1e1e1e', minHeight: '100vh', pt: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} direction="column" alignItems="center">
          {/* Add Data Section */}
          <Grid item xs={12} md={6} sx={{ width: '100%' }}>
            <Card sx={{ width: '100%', bgcolor: 'white' }}>
              <CardContent>
                <Typography variant="h5" textAlign="center" gutterBottom>
                  Add Data
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 2
                  }}
                >
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <TextField
                    label="Value"
                    variant="outlined"
                    type="number"
                    fullWidth
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    ADD DATA
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Data Display Section */}
          <Grid item container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', bgcolor: 'white' }}>
                <CardContent>
                  <Typography variant="h5" textAlign="center" gutterBottom>
                    Data Table
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', bgcolor: 'white' }}>
                <CardContent>
                  <Typography variant="h5" textAlign="center" gutterBottom>
                    Data Visualization
                  </Typography>
                  <Box sx={{ height: 300, width: '100%' }}>
                    <ResponsiveContainer>
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#2196f3" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;