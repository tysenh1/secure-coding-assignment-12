const Pool = require('pg').Pool


const pool = new Pool({
    connectionString: 'postgres://pioplpdx:uqp9SZN7ecb9tZRsRIn9B2M328vKPyHD@isilo.db.elephantsql.com/pioplpdx'
})

pool.query(`
  CREATE TABLE IF NOT EXISTS issues (
    id SERIAL PRIMARY KEY,
    summary VARCHAR(400) NOT NULL,
    category VARCHAR(30) NOT NULL,
    description VARCHAR(400) NOT NULL,
    fix VARCHAR(400) NOT NULL,
    notes VARCHAR(400)
  )
`, (err, result) => {
  if (err) {
    console.error('Error creating the issues table', err);
  } else {
    console.log('Issues table created successfully');
  }
});

pool.query(`
  CREATE TABLE IF NOT EXISTS incidents (
    id SERIAL PRIMARY KEY,
    summary VARCHAR(400) NOT NULL,
    category VARCHAR(30) NOT NULL,
    description VARCHAR(400) NOT NULL,
    systems_affected text[] NOT NULL,
    fix VARCHAR(400) NOT NULL,
    notes VARCHAR(400)
  )
`, (err, result) => {
  if (err) {
    console.error('Error creating the incidents table', err);
  } else {
    console.log('Incidents table created successfully');
  }
});

pool.query(`
  CREATE TABLE IF NOT EXISTS problems (
    id SERIAL PRIMARY KEY,
    summary VARCHAR(400) NOT NULL,
    category VARCHAR(30) NOT NULL,
    description VARCHAR(400) NOT NULL,
    incidents text[] NOT NULL,
    fix VARCHAR(400) NOT NULL,
    notes VARCHAR(400)
  )
`, (err, result) => {
  if (err) {
    console.error('Error creating the problems table', err);
  } else {
    console.log('Problems table created successfully');
  }
});

// ===================================================================== //
// =========================== Issues queries ========================== //
// ===================================================================== //

const getIssues = async () => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM issues', (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(results.rows);
                } else {
                    reject(new Error("No results found"))
                }
            })
        })
    } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error")
    }
}

const getIssueById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM issues WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
        
    })
}


const createIssue = (body) => {
    return new Promise(function (resolve, reject) {
        const { summary, category, description, fix, notes } = body;
        pool.query(
            'INSERT INTO issues (summary, category, description, fix, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [summary, category, description, fix, notes],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(
                        `A new issue has been added: ${JSON.stringify(results.rows[0])}`
                    )
                } else {
                    reject(new Error("No results found"))
                }
            }
        )
    })
}


const deleteIssue = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(
            'DELETE FROM issues WHERE id = $1',
            [id],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(`Issue deleted with ID: ${id}`)
            }
        )
    })
}


const updateIssue = (id, body) => {
    return new Promise(function (resolve, reject) {
        const { summary, category, description, fix, notes } = body;
        pool.query(
            "UPDATE issues SET summary = $1, category = $2, description = $3, fix = $4, notes = $5 WHERE id = $6 RETURNING *",
            [summary, category, description, fix, notes, id],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(`Issue updated: ${JSON.stringify(results.rows[0])}`);
                } else {
                    reject(new Error("No results found"));
                }
            }
        );
    });
};

const getIssuesId = (request, response) => {
    pool.query('SELECT id FROM issues ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log(error)
            response.status(401).send(error)
        }
        response.status(200).json(results.rows)
    })
}

// ===================================================================== //
// ========================== Incident queries ========================= //
// ===================================================================== //

const getIncidents = async () => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM incidents', (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(results.rows);
                } else {
                    reject(new Error("No results found"))
                }
            })
        })
    } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error")
    }
}

const getIncidentById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM incidents WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
        
    })
}


const createIncident = (body) => {
    return new Promise(function (resolve, reject) {
        const { summary, category, description, systems_affected, fix, notes } = body;
        pool.query(
            'INSERT INTO incidents (summary, category, description, systems_affected, fix, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [summary, category, description, systems_affected, fix, notes],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(
                        `A new incident has been added: ${JSON.stringify(results.rows[0])}`
                    )
                } else {
                    reject(new Error("No results found"))
                }
            }
        )
    })
}


const deleteIncident= (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(
            'DELETE FROM incidents WHERE id = $1',
            [id],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(`Incident deleted with ID: ${id}`)
            }
        )
    })
}


const updateIncident = (id, body) => {
    return new Promise(function (resolve, reject) {
        const { summary, category, description, systems_affected, fix, notes } = body;
        pool.query(
            "UPDATE incidents SET summary = $1, category = $2, description = $3, systems_affected = $4, fix = $5, notes = $6 WHERE id = $7 RETURNING *",
            [summary, category, description, systems_affected, fix, notes, id],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(`Incident updated: ${JSON.stringify(results.rows[0])}`);
                } else {
                    reject(new Error("No results found"));
                }
            }
        );
    });
};

const getIncidentsId = (request, response) => {
    pool.query('SELECT id FROM incidents ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log(error)
            response.status(401).send(error)
        }
        response.status(200).json(results.rows)
    })
}

// ===================================================================== //
// ========================== Problems Queries ========================= //
// ===================================================================== //

const getProblems = async () => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM problems', (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(results.rows);
                } else {
                    reject(new Error("No results found"))
                }
            })
        })
    } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error")
    }
}

const getProblemById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM problems WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
        
    })
}

const createProblem = (body) => {
    return new Promise(function (resolve, reject) {
        const { summary, category, description, incidents, fix, notes } = body;
        pool.query(
            'INSERT INTO problems (summary, category, description, incidents, fix, notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [summary, category, description, incidents, fix, notes],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(
                        `A new problem has been added: ${JSON.stringify(results.rows[0])}`
                    )
                } else {
                    reject(new Error("No results found"))
                }
            }
        )
    })
}

const deleteProblem= (id) => {
    return new Promise(function (resolve, reject) {
        pool.query(
            'DELETE FROM problems WHERE id = $1',
            [id],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(`Problem deleted with ID: ${id}`)
            }
        )
    })
}

const updateProblem = (id, body) => {
    return new Promise(function (resolve, reject) {
        const { summary, category, description, incidents, fix, notes } = body;
        pool.query(
            "UPDATE problems SET summary = $1, category = $2, description = $3, incidents = $4, fix = $5, notes = $6 WHERE id = $7 RETURNING *",
            [summary, category, description, incidents, fix, notes, id],
            (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(`Problems updated: ${JSON.stringify(results.rows[0])}`);
                } else {
                    reject(new Error("No results found"));
                }
            }
        );
    });
};

const getProblemsId = (request, response) => {
    pool.query('SELECT id FROM problems ORDER BY id ASC', (error, results) => {
        if (error) {
            console.log(error)
            response.status(401).send(error)
        }
        response.status(200).json(results.rows)
    })
}


module.exports = {
    getIssues,
    getIssueById,
    createIssue,
    deleteIssue,
    updateIssue,
    getIssuesId,

    getIncidents,
    getIncidentById,
    createIncident,
    deleteIncident,
    updateIncident,
    getIncidentsId,

    getProblems,
    getProblemById,
    createProblem,
    deleteProblem,
    updateProblem,
    getProblemsId,
}