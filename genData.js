const fs = require('fs')

// Create the large test data
const testData = JSON.stringify(Array.from({ length: 10 }, (_, i) => ({ id: i, value: `value-${i}` })))

const saveToFile = async () => {
  try {
    // Define the file path where the data will be saved
    const filePath = './data.json' // You can change the path as needed

    // Write the JSON string to the file
    await fs.promises.writeFile(filePath, testData, 'utf8')

    console.log(`Data saved successfully to ${filePath}`)
  } catch (error) {
    console.error('Error saving file:', error)
  }
}

saveToFile()



