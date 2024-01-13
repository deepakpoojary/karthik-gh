const express = require('express');
const app = express();
const port = 4000;
const bodyParser= require('body-parser')
const path= require('path')
const cors = require('cors');
const pool = require('./database')
// Define a route

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle POST requests
app.post('/submit', (req, res) => { //we are catching the data from this 
    const username= req.body["name"];
    const choice= req.body["choice"];
    const date= req.body["birthdate"];
    const insertSTMT = `INSERT INTO accounts6 (username,choice,birthdate) VALUES ('${username}','${choice}','${date}');`;
    pool
      .query(insertSTMT)
      .then((response) => {
        console.log("data saved ");
        console.log(response);  
      })
      .catch((err) =>{
        console.log(err)
      })
      console.log(req.body);
      res.send("response received "+req.body);

    // Do something with the input data
    /*console.log('Received data:', inputData);

    // Send a response back
    res.send('Data received successfully!'); */

});

app.get('/recievedata',async (req,res)=>{
  console.log('success')
  const data = await pool.query('SELECT * FROM accounts6')
  console.log(data.rows)
  res.json(data.rows).status(200)
  //res.send('Success').status(200)
})
app.get('/data', async (req, res) => {
  try {
    
    // Query the database
    const result = await pool.query('SELECT * FROM accounts6');

    // Extract relevant data from thecolumn
    const data = result.rows.map(row => ({
      name: row.username,
      voting_choice: row.choice, // choice is the column name 
      casted_at: row.birthdate ? row.birthdate.toISOString().split('T')[0] : null,
    }));
    console.log(data); 
    res.json({data}); 
    // sending response with data structure
    const tableHtml = generateTableHtml(data);
    res.send(tableHtml);

  }
   catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });

  } 
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
function generateTableHtml(data) {

  const headerRow = '<tr><th style="padding: 10px text-align:center">Name</th><th>Voting Choice</th><th>Casted At</th></tr>';
  const bodyRows = data.map(row => `<tr style="padding: 10px; text-align:center"><td style="padding: 10px">${row.name}</td><td>${row.voting_choice}</td><td>${row.casted_at}</td></tr>`).join('');

  return `
  
    <h2 style="color: #333; font-family: 'poppins', sans-serif; text-align: center;">Table</h2>

      <table style="width: 100%; border-collapse: collapse; font-family: 'poppins', sans-serif; font-size: 14px; ">
        <thead style="background-color: #f2f2f2;">
          ${headerRow}
        </thead>
        <tbody >
          ${bodyRows}
        </tbody>
      </table>
    </div>
    </div> 
  `;
}
