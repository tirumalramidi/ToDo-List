const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")

const app = express()

app.use(bodyParser.urlencoded({
  encoded: true
}))
app.use(express.static("public"))

app.set("view engine", "ejs")

const items = ["Prepare Timetable", "Complete the Project", "Take the test"]
const workItems = []
app.get("/", function(req, res) {

  const day = date.getDay()

  res.render("list", {
    listTitle: day,
    newListItems: items
  })

  // res.sendFile(__dirname+"/index.html")
})

app.post("/", function(req, res) {
  const item = req.body.newItem
  const title = req.body.list
  console.log(req.body);
  if (title === "Work") {
    workItems.push(item)
    res.redirect("/work")
  } else {
    items.push(item)
    res.redirect("/")
  }

})

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  })
})

app.get("/about", function(req, res) {
  res.render("about")
})


app.listen(process.env.PORT || 3000, function() {
  console.log("server started listening")
})
