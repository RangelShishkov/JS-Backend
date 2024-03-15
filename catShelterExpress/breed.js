const breeds = [];

exports.addBreed = (breed) => {
    breeds.push({breed});
};

exports.getBreeds = () => breeds.slice();