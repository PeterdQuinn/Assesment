import { useState, useEffect } from "react";
import { fetchData, DataItem } from "./api/api";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button, Box, Grid, Card, CardContent, Alert } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [data, setData] = useState<DataItem[]>([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData().then(setData).catch(() => setError("Failed to fetch data"));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || isNaN(parseFloat(value))) {
      setError("Please enter a valid name and value");
      return;
    }
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/data`, { name, value: parseFloat(value) });
      const updatedData = await fetchData(); // Fetch updated data after insertion
      setData(updatedData);
      setName("");
      setValue("");
    } catch (error) {
      setError("Failed to add data. Please try again.");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", py: 4 }}>
      <Card sx={{ width: "60%", p: 4, mb: 4, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h3" gutterBottom textAlign="center" sx={{ fontWeight: "bold", color: "#333" }}>
            Business Intelligence Dashboard
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%" }}>
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
            <Button type="submit" variant="contained" color="primary" sx={{ py: 1.5, fontSize: "1.2rem" }}>
              Add Data
            </Button>
          </Box>
        </CardContent>
      </Card>
      
      <Grid container spacing={4} justifyContent="center" sx={{ width: "80%" }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, width: "100%" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom textAlign="center" sx={{ fontWeight: "bold" }}>
                Data Table
              </Typography>
              <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>ID</b></TableCell>
                      <TableCell><b>Name</b></TableCell>
                      <TableCell><b>Value</b></TableCell>
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
          <Card sx={{ boxShadow: 3, borderRadius: 2, width: "100%" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom textAlign="center" sx={{ fontWeight: "bold" }}>
                Data Visualization
              </Typography>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#1976D2" strokeWidth={4} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
