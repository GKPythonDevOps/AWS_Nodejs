const AWS = require('aws-sdk')
const express = require('express')
const app = express()


app.get('/video', (req, res) => {
  const s3 = new AWS.S3()

  const params = {
    Bucket: "videostoragebucketformicroservicesapplication", 
    Key: "EN5bIhhUUAAXq1s.jfif"
  }

  s3.getObject(params, (err, rest) => {
    if (err) throw err;

    const b64 = Buffer.from(rest.Body).toString('base64');
    // IF THE ABOVE LINE DOES NOT WORK, TRY THIS:
    // const b64 = rest.Body.toString('base64');

    // CHANGE THIS IF THE IMAGE YOU ARE WORKING WITH IS .jpg OR WHATEVER
    const mimeType = 'image/png'; // e.g., image/png
    
    res.send(`<img src="data:${mimeType};base64,${b64}" />`);
  });
});
    
port = 4000;
app.listen(port, () => {
  console.log(`Microservice listening on port ${port}, point your browser at http://localhost:${port}/video`);
});