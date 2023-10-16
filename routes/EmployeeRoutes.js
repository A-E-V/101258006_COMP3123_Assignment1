const express = require('express')
const EmployeeModel = require('../models/EmployeeModels')

const routes = express.Router()

//User creates new employee
//http://localhost:3032/api/v1/emp/employees
routes.post('/employees', async (req, res) => {
    try{
        const newEmp = new EmployeeModel({
            ...req.body
        })
        await newEmp.save()
        console.log("New Employee created: " + newEmp)
        res.status(201).send(newEmp)
    }catch(error){
        res.status(500).send(error)
    }
})

//User can view all employees
//http://localhost:3032/api/v1/emp/employees
routes.get('/employees', async (req, res) => {
    try{
        const empList = await EmployeeModel.find({})
        console.log("ALL EMPLOYEES: \n" + empList)
        res.status(200).send(empList)
    }catch(error){
        res.status(500).send(error)
    }
})

//User can get employee's details with employee id
//http://localhost:3032/api/v1/emp/employees/:eid
routes.get('/employees/:eid', async (req, res) => {
    try{
        const emp = await EmployeeModel.findById(req.params.eid)
        if(emp){
            console.log("Employee found: " + emp)
            res.status(200).send(emp)

        }else{
            console.log("No Employee found")
            res.status(404).send("No Employee found")
        }

    }catch(error){
        res.status(500).send(error)
    }
})

//User can update employee details
//http://localhost:3032/api/v1/emp/employees/:eid
routes.put('/employees/:eid', async (req, res) => {
    try{
        const updatedEmp = await EmployeeModel.findByIdAndUpdate(req.params.eid, req.body, { new: true })
        console.log("Updated the employee info: \n" + updatedEmp)
        res.status(200).send(updatedEmp)
    }catch(error){
        res.status(500).send(error)
    }
})

//User can delete employee by employee id
//http://localhost:3032/api/v1/emp/employees?eid=
routes.delete('/employees', async (req, res) => {
    const {eid} = req.query
    try{
        const dltEmp = await EmployeeModel.findByIdAndDelete(eid)
        if(!dltEmp){
            console.log("Employee not found")
            res.status(404).send("Employee not found")
        }else{
            console.log("Employee Deleted: " + dltEmp)
            res.status(200).send("Employee deleted: " + dltEmp)
        }
    }catch(error){
        res.status(500).send(error)
    }
})

module.exports = routes