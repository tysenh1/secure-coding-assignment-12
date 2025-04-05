const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3001


app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
})

app.use(cors())

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

const db = require('./queries')

app.get("/", (req, res) => res.send("Express on Vercel"));

// ===================================================================== //
// ===================================================================== //
// =============================== Issues ============================== //
// ===================================================================== //
// ===================================================================== //

app.get('/issues', (req, res) => {
    db.getIssues()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/issues', (req, res) => {
    db.createIssue(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.delete('/issues/:id', (req, res) => {
    db.deleteIssue(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.put('/issues/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    db
        .updateIssue(id, body)
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((error) => {
            res.status(500).send(error)
        })
})

// app.get('/issues', db.getIssues)
app.get('/issues/id', db.getIssuesId)
app.get('/issues/:id', db.getIssueById)
// app.post('/issues', db.createIssue)
// app.delete('/issues/:id', db.deleteIssue)
// app.put('/issues/:id', db.updateIssue)

// ===================================================================== //
// ===================================================================== //
// ============================= Incidents ============================= //
// ===================================================================== //
// ===================================================================== //

app.get('/incidents', (req, res) => {
    db.getIncidents()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/incidents', (req, res) => {
    db.createIncident(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.delete('/incidents/:id', (req, res) => {
    db.deleteIncident(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.put('/incidents/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
        db.updateIncident(id, body)
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((error) => {
            res.status(500).send(error)
        })
})

// app.put('/incidents/:id', (req, res) => {
//     const id = req.params.id;
//     const body = req.body;
//     db
//         .updateIncident(id, body)
//         .then((response) => {
//             res.status(200).send(response);
//         })
//         .catch((error) => {
//             res.status(500).send(error)
//         })
// })

// app.get('/issues', db.getIssues)
app.get('/incidents/id', db.getIncidentsId)
app.get('/incidents/:id', db.getIncidentById)
// app.post('/issues', db.createIssue)
// app.delete('/issues/:id', db.deleteIssue)
// app.put('/incidents/:id', db.updateIssue)


// ===================================================================== //
// ===================================================================== //
// ============================== Problems ============================= //
// ===================================================================== //
// ===================================================================== //

app.get('/problems', (req, res) => {
    db.getProblems()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.post('/problems', (req, res) => {
    db.createProblem(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.delete('/problems/:id', (req, res) => {
    db.deleteProblem(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.put('/problems/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
        db.updateProblem(id, body)
        .then((response) => {
            res.status(200).send(response);
        })
        .catch((error) => {
            res.status(500).send(error)
        })
})

app.get('/problems/id', db.getProblemsId)
app.get('/problems/:id', db.getProblemById)




app.listen(port, () =>{
    console.log(`App running on port ${port}`)
})



