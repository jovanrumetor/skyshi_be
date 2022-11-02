import db from "../models/database.js";

export const getTodos = async (req, res, next) => {
  try {
    if (req.query.activity_group_id != null) {
      let sqlwhere = `SELECT * FROM todo_items WHERE activity_group_id = '${req.query.activity_group_id}';`
      db.query(sqlwhere, function(err, rows, fields) {
        const data = rows
        res.status(200).json({status: "Success", message: "Success", data});
       })
    } else {
      let sqlall = "SELECT * FROM todo_items;";
      db.query(sqlall, function(err, rows, fields) {
        const data = rows
        res.status(200).json({status: "Success", message: "Success", data});
       })
    }
  } catch (error) {
    next(error);
  }
}

export const getTodo = async (req, res, next) => {
  try {
    let sql =  `SELECT * FROM todo_items WHERE id = '${req.params.id}';`;

    db.query(sql, function(err, rows, fields) {
      const data = rows
      const {is_active, ...others} = rows

      if(data.length == 0) {
        res.status(404).json({status: "Not Found", message: `Todo with ID ${req.params.id} Not Found`, data: {} });
      } else {
        res.status(200).json({status: "Success", message: 'Success',data: data[0] });
      }
     })
  } catch (error) {
    next(error);
  }
}

export const createTodo = async (req, res, next) => {
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
    } else if (!req.body.activity_group_id) {
      res.status(400).json({status: "Bad Request", message: "activity_group_id cannot be null", data: {} });
    } else {
      let active = 1;
      let priority = "very-high";

      let sqlinsert = `insert into todo_items (activity_group_id, title, is_active, priority, created_at, updated_at) values ( '${req.body.activity_group_id}', '${req.body.title}', '${active}' , '${priority}' , '${dateTime}', '${dateTime}')`

      db.query(sqlinsert, function(err, result) {
        if (err) throw err;  
        let sqlget =  `SELECT * FROM todo_items WHERE id = '${result.insertId}';`;
        db.query(sqlget, function(err, rows, fields) {
        const data = rows
        res.status(201).json({status: "Success", message: 'Success',data: data[0]});
         })
       })
    }

  } catch (err) {
    next(err);
  }
}

export const deleteTodo = async (req, res, next) => {
  try {

    let sql =  `SELECT * FROM todo_items WHERE id = '${req.params.id}';`;

    db.query(sql, function(err, rows,) {
      const data = rows;
      if(data.length == 0) {
        res.status(404).json({status: "Not Found", message: `Todo with ID ${req.params.id} Not Found`, data: {} });
      } else {
        let sqldelete = `DELETE FROM todo_items where id = ${req.params.id}`
        db.query(sqldelete, function(err, rows,) {
        })
        res.status(200).json({status: "Success", message: 'Success',data:{}});
        }
    })

  } catch (err) {
    next(err);
  }
}

export const updateTodo = async (req, res, next) => {
  try {
    let date = new Date();
    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let hh = date.getHours();
    let mn = date.getMinutes();
    let ss = date.getSeconds();
    let dateTime = yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mn + ":" + ss;

    let sqlget =  `SELECT * FROM todo_items WHERE id = '${req.params.id}';`;
    db.query(sqlget, function(err, rows,) {
      const todo = rows;

      if (todo.length == 0) {
        res.status(404).json({status: "Not Found", message: `Todo with ID ${req.params.id} Not Found`, data: {} });
      } else if (req.body.is_active != null && req.body.title == null) {
        
        const active = (req.body.is_active === true ) ? 1 : 0;
        let sqlupdate = `UPDATE todo_items set is_active = '${active}' , updated_at = '${dateTime}' where id = ${req.params.id}`
        db.query(sqlupdate, function(err, rows) {
          db.query(sqlget, function(err, rows,) {
            res.status(200).json({status: "Success1", message: 'Success',data: rows[0]});
           })
         })

      } else if (req.body.is_active == null && req.body.title != null) {
        let sqlupdate = `UPDATE todo_items set title = '${req.body.title}' , updated_at = '${dateTime}' where id = ${req.params.id}`
        db.query(sqlupdate, function(err, rows) {
          db.query(sqlget, function(err, rows,) {
            res.status(200).json({status: "Success2", message: 'Success',data: rows});
           })
         })
         
      } else {
        
        const active = (req.body.is_active === true) ? 1 : 0;
        let sqlupdate = `UPDATE todo_items set is_active = '${active}', title = '${req.body.title}' , updated_at = '${dateTime}' where id = ${req.params.id}`
        db.query(sqlupdate, function(err, rows) {
          db.query(sqlget, function(err, rows,) {
            res.status(200).json({status: "Success 3", message: 'Success',data: rows[0]});
           })
         })
      }

    })
  } catch (err) {
    next(err);
  }
}

