const cars = [];

exports.addCar = (model, year) => {
    cars.push({model, year});
};

exports.getCars = () => cars.slice();