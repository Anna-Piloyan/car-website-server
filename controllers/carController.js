const Car = require('../models/car')
var fs = require("fs")

exports.getCars = function (req, res) {
    Car.find({}, function (err, cars) {
        if (err) return console.log(err);
        res.send(cars)
    });
}

exports.getCar = function (req, res) {
    const id = req.params.id;
    Car.findOne({ _id: id }, function (err, car) {
        if (err) return console.log(err);
        res.send(car);
    });
};

exports.addCar = function (req, res) {

    if (!req.body) return res.sendStatus(400);

    let filedata = req.body.filedata
    console.log(filedata)
    const model = req.body.model;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.body.image;
    const car = new Car({
        model: model, price: price,
        description: description, image: image
    });

    car.save(function (err) {

        if (err) return console.log(err);
        res.send(car);
    });

};

exports.deleteCar = function (req, res) {
    const id = req.params.id;
    Car.findByIdAndDelete(id, function (err, car) {
        if (err) return console.log(err);
        fs.unlink('public/uploads/' + car.image, function (error) {
            if (error) return console.log(error)
        });
        return res.send(car);
    });

};

exports.updateCar = function (req, res) {
    let newCar = null;
    if (!req.body) return res.sendStatus(400);
    const id = req.body._id;
    const model = req.body.model;
    const price = req.body.price;
    const description = req.body.description;
    const image = req.body.image;
    newCar = {
        image: image, price: price,
        model: model, description: description
    };
   
    Car.findOneAndUpdate({ _id: id }, newCar, { new: true }, function (err, car) {
       
        if (err) return console.log(err);
        res.send(car);
    });
    // if (req.file != undefined) {
    //     const image = req.file.filename;
    //     newCar = {
    //         image: image, price: price,
    //         model: model, description: description
    //     };
    // }
    // else {
    //     newUser = {
    //         price: price,
    //         model: model, description: description
    //     };
    // }
    // Car.findByIdAndUpdate(id, newCar, { new: true }, function (err, car) {
    //     console.log("BASE")
    //     console.log(car)
    //     if (err) return console.log(err);
    //     res.status(200).send(car);
    //   });
    
    
};


