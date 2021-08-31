const sql = require('mssql')
const sqlConfig = {
  user: 'sa',
  password: '1234',
  database: 'FaceLogs',
  server: "DESKTOP-SQFSQCT",
  port: 11000,
  options: {
    trustServerCertificate: true // change to true for local dev / self-signed certs
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
}

async function save_face(data) {
  try {
    let pool = await sql.connect(sqlConfig)
    await pool.request()
      .input('id', sql.VarChar, data.id)
      .input('name', sql.VarChar, "Unkown")
      .input('encoded_face', sql.VarChar, data.encoded_face)
      .input('date', sql.DateTime, new Date())
      .input('image', sql.VarChar, data.image)
      .query('insert into faces_table (id,name,encoded_face,date,image) values (@id,@name,@encoded_face,@date,@image)')
  }
  catch (err) {
    console.log(err)
  }
}

async function get_faces() {
  try {
    let pool = await sql.connect(sqlConfig)
    let result1 = await pool.request().query('select * from faces_table')
    return result1
  }
  catch (err) {
    console.log(err)
  }
}

async function update_face_name(data) {
  try {
    let pool = await sql.connect(sqlConfig)
    await pool.request().input('id', sql.VarChar, data.id).input('name', sql.VarChar, data.name).query('update faces_table set name=@name where id=@id')
  }
  catch (err) {
    console.log(err)
  }
}

async function delete_face(data) {
  try {
    let pool = await sql.connect(sqlConfig)
    await pool.request().input('id', sql.VarChar, data.id).query('delete from faces_table where id=@id')
  }
  catch (err) {
    console.log(err)
  }
}



module.exports = {
  save_face,
  get_faces,
  update_face_name,
  delete_face
}