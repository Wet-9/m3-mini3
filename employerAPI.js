// Importing express

var express = require('express');
var app = express();
app.use(express.json());

//Server start
var server = app.listen(8000, function() {
    console.log("server is ON");
})

// Array of employees and their information
const Employers = [
    {
      ID: 1,
      Name: 'Aaron Lee',
      Department: 'Software',
      Salary: 100000
    },
    {
      ID: 2,
      Name: 'Joe Mama',
      Department: 'Marketing',
      Salary: 50000
    },
    {
      ID: 3,
      Name: 'Donald Duck',
      Department: 'HR',
      Salary: 700000
    },
  ];

// Get Employers array Data (WORKS)
app.get('/Employers',(req, res)=>{
    res.send(Employers);
});

// HTTP Post (WORKS)
app.post('/Employers/add_employee',(req, res)=>{
    const Employee1 = {
        ID: req.body.ID,
        Name: req.body.Name,
        Department: req.body.Department,
        Salary: req.body.Salary 
   };
   Employers.push(Employee1);
   res.status(200).send(Employee1);
});

// HTTP Put (WORKS)
app.put('/Employers/change/:ID', (req, res)=>{
    const Employee1 = Employers.find((element)=>{
    if(element.ID === parseInt(req.params.ID) )
        {return true;}
    });
    if(Employee1){
        Employee1.ID = req.body.ID;
        Employee1.Name = req.body.Name;
        Employee1.Department = req.body.Department;
        Employee1.Salary = req.body.Salary;
        return res.status(200).send(Employee1);
    }
    return res.status(404).send('Wrong ID, No Employee Found');
});

// HTTP Patch (WORKS)
app.patch('/Employers/update/:ID', (req, res)=>{
    const Employee1 = Employers.find((element)=>{
    if (element.ID === parseInt(req.params.ID)) 
    {return true;}
    });
    if (Employee1) {
    for (let i in req.body){
        Employee1[i] = req.body[i];
    }
    return res.status(200).send(Employee1);
    }
    return res.status(404).send('Wrong ID, No Employee Found');
    });


// Deletes employee based on ID (WORKS)
app.delete('/Employers/delete/:id', (req, res)=>{
    const Employee1 = Employers.find((element)=>{
        {return true;}
    });
    if(Employee1){
        const index = Employers.indexOf(Employee1);
        Employers.splice(index, 1);
        return res.status(200).send(Employee1);
    }
    return res.status(404).send('Wrong ID, No Employee Found');
});