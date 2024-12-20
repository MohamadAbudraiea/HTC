import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets HTC",
  password: "4412106",
  port: 5432,
});
db.connect();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/first_p", (req, res) => {
  res.render("first_p.ejs");
});
app.get("/home", (req, res) => {
  res.render("home.ejs");
});
app.get("/comp-1", (req, res) => {
  res.render("comp-1.ejs");
});
app.get("/profile", (req, res) => {
  res.render("profile.ejs");
});
app.get("/CV", (req, res) => {
  res.render("CV.ejs");
});
app.get("/task_std", (req, res) => {
  res.render("task_std.ejs");
});
app.get("/rating", (req, res) => {
  res.render("rating.ejs");
});
app.get('/companies', (req, res) => {
  res.render('companies.ejs'); //
});
app.get('/courses', (req, res) => {
  res.render('courses.ejs'); //
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get('/register2', (req, res) => {
  res.render('register2.ejs'); // يعرض صفحة التسجيل الجديدة باسم 
});

app.get('/register3', (req, res) => {
  res.render('register3.ejs'); // يعرض صفحة التسجيل الجديدة باسم 
});

app.get('/register4', (req, res) => {
  res.render('register4.ejs'); // يعرض صفحة التسجيل الجديدة باسم 
});
app.get("/", (req, res) => {
  res.render("first_p.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});



app.post('/register', (req, res) => {
  res.render('register.ejs'); // يعرض صفحة التسجيل الجديدة باسم 
});
app.post('/register3', (req, res) => {
  res.render('register3.ejs'); // يعرض صفحة التسجيل الجديدة باسم 
});
app.post('/register4', (req, res) => {
  res.render('register4.ejs'); // يعرض صفحة التسجيل الجديدة باسم 
});
app.post('/comp-1', (req, res) => {
  res.render('comp-1.ejs'); // يعرض صفحة التسجيل الجديدة باسم 
});



app.post('/register3', (req, res) => {
  res.render('register3.ejs'); // يعرض صفحة التسجيل الجديدة باسم 
});



app.post("/register", async (req, res) => {
  const username = req.body.username;
  const std_id = req.body.std_id;  
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password= req.body.confirm_password;
  if (password !== confirm_password) {
    return res.send("Passwords do not match. Please try again.");
  }

  if (password !== confirm_password) {
    return res.send("Passwords do not match. Please try again.");
  }

  

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE std_id = $1", [std_id]);
    if (checkResult.rows.length > 0) {
      return res.send("ID already exists. Try logging in.");
    }

    const emailCheckResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (emailCheckResult.rows.length > 0) {
      return res.send("Email already exists. Try logging in.");
    }

    // تجزئة كلمة المرور
   
    // إدخال المستخدم الجديد في قاعدة البيانات
    const result = await db.query(
      "INSERT INTO users (username, std_id, email, password) VALUES ($1, $2, $3, $4)",
      [username, std_id, email, password]
    );

    console.log(result);
    res.render("home.ejs");
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }

});


app.post("/login", async (req, res) => {
  const std_id = req.body.std_id;   
  const password = req.body.password;   
  try {
    const result = await db.query("SELECT * FROM users WHERE std_id = $1", [
      std_id,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      if (password === storedPassword) {
        res.render("home.ejs");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }

});

app.post("/delete-account", async (req, res) => {
  const std_id = req.body.std_id; // يستلم الـ std_id من النموذج المخفي
  
  try {
    // حذف الحساب من قاعدة البيانات باستخدام الـ std_id
    const result = await db.query("DELETE FROM users WHERE std_id = $1", [std_id]);
    
    // التحقق من وجود الحساب قبل الحذف
    if (result.rowCount > 0) {
      res.send("Your account has been deleted successfully.");
    } else {
      res.send("Error: Account not found.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error: " + err.message);
  }
});

app.post("/delete-account", async (req, res) => {
  const { std_id } = req.body;

  try {
    //  حذف المستخدم من قاعدة البيانات
    const result = await db.query("DELETE FROM users WHERE std_id = $1", [std_id]);

    if (result.rowCount > 0) {
      res.send("Your account has been deleted successfully.");
    } else {
      res.send("Error: Account not found.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error: " + err.message);
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
