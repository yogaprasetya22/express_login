const express = require('express')
const bcrypt = require('bcrypt')
const path = require('path');
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

const pengguna = [
  {
    id: '1637396739799',
    username: 'bouwie',
    email: 'yogaagle321z@gmail.com',
    password: '$2b$10$oyOQptYMOd/bNaERPLZNBOwjqXD5ug2tqpfS4wIuoC7VpljTjhkFy'//asd
  }
]



app.get('/', (req, res) => {
  res.render('register')
})

//post registerasi
app.post('/register', async (req, res) => {
  // document.querySelector('.berhasil').innerHTML = `<%if (pesan%) {%><p class="<%=clr%>"><%=pesan%></p><%}%>`;
  const { username, email, password, confrimpassword } = req.body;
  if (password === confrimpassword) {
    if (pengguna.find(user => user.email === email)) {
      res.render('register', { pesan: 'pengguna sudah ada' })
      console.log('pengguna sudah ada')
      return;
    }
    try {
      const hashpassword = await bcrypt.hash(password, 10)
      pengguna.push({
        id: Date.now(10).toString(),
        username,
        email,
        password: hashpassword
      })
      res.redirect('/login')
    } catch {
      res.render('register', { pesan: 'Error' })
      console.log('Error')
    } console.log(pengguna)
  } else {
    console.log('Password tidak sama')
    res.render('register', { pesan: 'Password tidak sama' })
  }
})





app.get('/login', (req, res) => {
  res.render('login')
})

//cek password
const authToken = {};
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = pengguna.find(user => user.email = email)

  if (user == null) {
    return 'pengguna tidak ada'
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      res.redirect('index')
    } else {
      console.log('login gagal', await bcrypt.compare(password, user.password))
      res.render('login')
    }
  } catch {
    res.render('login')
    console.log('error')
  }

})



app.get('/index', (req, res) => {
  res.render('index')
})

app.listen(3004, () => console.log('http://localhost:3004'))