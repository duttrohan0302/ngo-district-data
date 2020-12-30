//Import Required Libraries
const express = require('express')
const router = express.Router()

// Import Models
const District = require('../models/District')

router.post('/district',async (req,res,next) => {

    try{
    // Get the data
        const { jsonData } = req.body;

        const district = {
            name: req.body.name,
            state: req.body.state,
            seroIndex: req.body.seroIndex,
            population: jsonData.length,
            profession: {
                non_worker : 0,
                medical_workers : 0,
                police_frontline : 0,
                armed_forces : 0,
                others: jsonData.length
            },
            age: {
                lt12: 0,
                btwn12_30: 0,
                btwn30_50: 0,
                bwtn50_70: 0,
                gt70: 0,
            }
        }

    //  Analyse and modify the data

        jsonData.forEach(person => {

            if(person.age<=12){
                district.age.lt12 = district.age.lt12 + 1;
            }
            else if(person.age<=30){
                district.age.btwn12_30 = district.age.btwn12_30 + 1;
            }
            else if(person.age<=50){
                district.age.btwn30_50 = district.age.btwn30_50 + 1;
            }
            else if(person.age<=70){
                district.age.btwn50_70 = district.age.btwn50_70 + 1;
            }

            if(person.profession.toLowerCase().includes('police') || person.profession.toLowerCase().includes('crpf')){
                district.profession.police_frontline = district.profession.police_frontline + 1;
                district.profession.others = district.profession.others - 1;
            }
            else if(person.profession.toLowerCase().includes('health')||person.profession.toLowerCase().includes('nurse') || person.profession.toLowerCase().includes('doctor') || person.profession.toLowerCase().includes('medical') || person.profession.toLowerCase().includes('emt') || person.profession.toLowerCase().includes('clinic')){
                district.profession.medical_workers = district.profession.medical_workers + 1;
                district.profession.others = district.profession.others - 1;
            }
            else if(person.profession.toLowerCase().includes('nonworker') || person.profession.toLowerCase().includes('non_worker') || person.profession.toLowerCase().includes('na')){
                district.profession.non_worker = district.profession.non_worker + 1;
                district.profession.others = district.profession.others - 1;
            }
            else if(person.profession.toLowerCase().includes('army') || person.profession.toLowerCase().includes('navy') || person.profession.toLowerCase().includes('force') || person.profession.toLowerCase().includes('air force') || person.profession.toLowerCase().includes('defence')){
                district.profession.armed_forces = district.profession.armed_forces + 1;
                district.profession.others = district.profession.others - 1;
            }

        })

    // Add the data to the database in correct format

        const response = await District.create(district);
        console.log(response)
        return res.status(response)
    }catch(e){
        console.log(e)
        return res.status(400).json(e)
    }
})

router.get('/districts',async (req,res,next)=> {

    try{
        const districts = await District.find({})
        return res.status(200).json(districts)
    }catch(e){
        console.log(e)
        return res.status(400).json(e)
    }
})

router.get('/district/:name',async (req,res,next)=> {

    try{
        const name = req.params.name;
        const district = await District.find({name:name})
        return res.status(200).json(district)
    }catch(e){
        console.log(e)
        return res.status(400).json(e)
    }
})

module.exports = router