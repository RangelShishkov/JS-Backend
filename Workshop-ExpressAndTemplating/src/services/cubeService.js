const uniqid = require("uniqid");
const fs = require('fs');
const path = require('path');

const DATABASE_FILE = path.join(__dirname, 'database.json');

const saveCubesToFile = (cubes) => {
  fs.writeFile(DATABASE_FILE, JSON.stringify(cubes, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Data written to file successfully');
  });
};

exports.create = (cubeData) => {
  const id = uniqid();
  const newCube = {
    id,
    ...cubeData,
  };

  // Read existing cubes from the file
  fs.readFile(DATABASE_FILE, (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    let cubes = JSON.parse(data); // Parse the existing JSON data
    cubes.push(newCube); // Add the new cube
    saveCubesToFile(cubes); // Save the updated cubes to file
  });

  return newCube;
};

exports.getAll = (search, from, to) => {
  try {
    const data = fs.readFileSync(DATABASE_FILE);
    let cubes = JSON.parse(data);

    // Apply search filter if provided
    if (search) {
      cubes = cubes.filter(cube =>
        cube.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply difficulty level filter if provided
    if (from) {
      cubes = cubes.filter(cube =>
        cube.difficultyLevel >= Number(from)
      );
    }
    if (to) {
      cubes = cubes.filter(cube =>
        cube.difficultyLevel <= Number(to)
      );
    }

    return cubes;
  } catch (error) {
    console.error('Error reading file:', error);
    return [];
  }
};

exports.getSingleCube = (id) => {
  const cubes = this.getAll();
  return cubes.find((cube) => cube.id === id);
};