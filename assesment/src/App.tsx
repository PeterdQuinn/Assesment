import { useState, useEffect } from "react";
import { fetchData, DataItem } from "./api/api";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button } from "@mui/material";
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        BI Dashboard
      </Typography>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mr: 2 }}
        />
        <TextField
          label="Value"
          variant="outlined"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          sx={{ mr: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Data
        </Button>
      </form>
      
      <TableContainer component={Paper} sx={{ mb: 4 }}>
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
      
      <Typography variant="h5" gutterBottom>
        Data Visualization
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default App;