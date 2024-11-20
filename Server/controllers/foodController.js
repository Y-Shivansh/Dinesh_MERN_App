
import express from 'express';
import APIFeatures from '../utils/APIFeatures.js';
import FoodListing from '../models/FoodListing.js';

// const foodItems = JSON.parse(
//     fs.readFileSync(path.resolve('db.json'), 'utf-8')
// );


export const getAllFood = async (req, res) => {
    try {
    console.log(req.query);
    // for moongoose
    const features = new APIFeatures(FoodListing.find() ,req.query)
                    .filter()
                    .sort()
                    .fieldLimiting();

    const newFood = await features.query;

    
    res.status(200).json({
        status: 'success',
        length: newFood.length,
        data: {
          newFood
        }
      });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status:'error comming',
            message:err
        })
    }

};

export const getFood = async (req, res) => {
    console.log(req.query);
    res.send('Fetching specific food');
};
