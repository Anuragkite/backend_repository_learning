import express from "express";

const app = express();
app.use(express.json());

const port = 4000;
// to listen to the port and give the output
app.listen(port, (req, res) => {
  console.log(`app is listening at the port number :${port}`);});

// app.get("/twitter" ,(req,res)=>{
//  res.send("This is the hie message from the server  to the twitter ")  ;
// })
// app.get("/ice-tea" ,(req,res)=>{
//  res.send("This is the hie message from the server  to the icetea ")  ;
// })

let NextID = 1;
let teaData = [];

//To send data to the server
app.post("/Twitters", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: NextID++, name, price };
  teaData.push(newTea);
  res.status(200).send(newTea);
});

// getting the information from the server
app.get("/Twitters", (req, res) => {
  res.status(200).send(teaData);
});


// getting only a single value from the array from the server
app.get("/Twitter/:id",(req,res)=>{
const tea = teaData.find(t=>t.id === parseInt(req.params.id));
if(!tea){
    return res.status(404).send("tea not found");
}

res.status(200).send(tea);
})

// updation of the data 
app.put("/Twitter/:id",(req,res)=>{
    const id = req.params?.id;
    console.log(req.params, req.body);
     const tea  = teaData.find(t=>t.id === parseInt(id));
     if(!tea){
        res.status(404).send("file not found ");
     }
     const{name,price} = req.body
     tea.name = name ;
     tea.price = price;
     res.send(200).send(tea) ;
    
    })


//deleting the data from the schema
    app.delete("/Twitter/:id",(req,res)=>{
    const Index = teaData.findIndex(t=> t.id === parseInt(req.params.id))
    if(Index === -1){
        return res.status(404).send("Index Invalid!!");
    }
    teaData.splice(Index,1)
    return res.status(202).send(teaData);
    })