const mongoose = require("mongoose");
const Double = require('@mongoosejs/double');
const Schema = mongoose.Schema;

const DistrictSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    seroIndex: {
        type: Double,
    },
    population: {
        type:Number,
        required: true
    },
    profession:{
        non_worker:{
            type:Number,
            required: true
        },
        medical_workers:{
            type:Number,
            required: true
        },
        police_frontline:{
            type:Number,
            required: true
        },
        armed_forces:{
            type:Number,
            required: true
        },
        others:{
            type:Number,
            required: true
        },
    },
    age: {
        lt12:{
            type:Number,
            required: true
        },
        btwn12_30:{
            type:Number,
            required: true
        },
        btwn30_50: {
            type:Number,
            required: true
        },
        bwtn50_70: {
            type:Number,
            required: true
        },
        gt70: {
            type:Number,
            required: true
        }
    },
    // storageCapacity:{
    //     type:Number,
    //     required:true
    // }
})
module.exports = District = mongoose.model("district", DistrictSchema);
