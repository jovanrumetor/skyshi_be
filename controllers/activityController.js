import db from "../models/database.js";

export const getActivities = async (req, res, next) => {
  try {
    let sql = "SELECT * FROM activity_groups;";

    db.query(sql, function(err, rows, fields) {
    const data = rows
    res.status(200).json({status: "Success", message: "Success", data});
   })
  } catch (error) {
    next(error);
  }
}

export const getActivity = async (req, res, next) => {
  try {
   
    let sql =  `SELECT * FROM activity_groups WHERE id = '${req.params.id}';`;

    db.query(sql, function(err, rows, fields) {
      const data = rows
      if(data.length == 0) {
        res.status(404).json({status: "Not Found", message: `Activity with ID ${req.params.id} Not Found`, data: {} });
      } else {
        res.status(200).json({status: "Success", message: 'Success',data: data[0] });
      }
      // console.log(data[0].email)
     })
  } catch (error) {
    next(error);
  }
}

export const createActivity = async (req, res, next) => {
  try {
    let date = new Date();
    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let hh = date.getHours();
    let mn = date.getMinutes();
    let ss = date.getSeconds();

    let dateTime = yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mn + ":" + ss;

    if (!req.body.title) {
      res.status(400).json({status: "Bad Request", message: "title cannot be null", data: {} });
    } else {
      let sql = `insert into activity_groups (email, title, created_at, updated_at) values ( '${req.body.email}', '${req.body.title}', '${dateTime}', '${dateTime}')`

      db.query(sql, function(err, result) {
        if (err) throw err;  
        let sql =  `SELECT * FROM activity_groups WHERE id = '${result.insertId}';`;
        db.query(sql, function(err, rows, fields) {
        const data = rows
        res.status(201).json({status: "Success", message: 'Success',data: data[0]});
         })
       })
    }

  } catch (err) {
    next(err);
  }
}

export const deleteActivity = async (req, res, next) => {
  try {

    let sql =  `SELECT * FROM activity_groups WHERE id = '${req.params.id}';`;

    db.query(sql, function(err, rows,) {
      const data = rows;
      if(data.length == 0) {
        res.status(404).json({status: "Not Found", message: `Activity with ID ${req.params.id} Not Found`, data: {} });
      } else {
        let sqldelete = `DELETE FROM activity_groups where id = ${req.params.id}`
        db.query(sqldelete, function(err, rows,) {
        })
        res.status(200).json({status: "Success", message: 'Success',data:{}});
        }
    })

  } catch (err) {
    next(err);
  }
}

export const updateActivity = async (req, res, next) => {
  try {
    let date = new Date();
    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let hh = date.getHours();
    let mn = date.getMinutes();
    let ss = date.getSeconds();

    let dateTime = yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mn + ":" + ss;
    let sqlget =  `SELECT * FROM activity_groups WHERE id = '${req.params.id}';`;
    db.query(sqlget, function(err, rows,) {
      const activity = rows
      if (activity.length == 0) {
        res.status(404).json({status: "Not Found", message: `Activity with ID ${req.params.id} Not Found`, data: {} });
      } else if (!req.body.title) {
        res.status(400).json({status: "Bad Request", message: "title cannot be null", data: {} });
      } else {
        let sqlupdate = `UPDATE  activity_groups set title = '${req.body.title}' , updated_at = '${dateTime}' where id = ${req.params.id}`
        db.query(sqlupdate, function(err, rows) {
          db.query(sqlget, function(err, rows,) {
            res.status(200).json({status: "Success", message: 'Success',data: rows});
           })
         })
         
      }
      

    })
   

  } catch (err) {
    next(err);
  }
}

