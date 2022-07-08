const csvFilePath = './csv/homework1.csv'
const csv = require('csvtojson')
const fs = require('fs');

async function csvToJson(filePath) {
    const csvToJsonRes = await csv().fromFile(filePath)
    return csvToJsonRes
}


// 1.1 write as a json object
const writeInJson = async () => {
    await fs.writeFile('./csv/1.1.json', JSON.stringify(Object.assign({}, await csvToJson(csvFilePath))), err => {
        if (err) {
            console.error(err);
        }
    });
}

// 1.2
const writeInTxtExactFormat = async () => {
    const readStream = fs.createReadStream(csvFilePath)
    const writeStream = fs.createWriteStream("./csv/1,2.txt")
    readStream.pipe(writeStream)
}

// 1.3

const writeInTxt = async (callback, filePath) => {
    const writeStream = fs.createWriteStream("./csv/1.3.txt");
    const arrayOfObj = await callback(filePath)

    writeStream.on("error", (err) => { console.log("ERROR", err) })
    arrayOfObj.forEach(chunk => {
        console.log(JSON.stringify(chunk) + "\n")
        writeStream.write(JSON.stringify(chunk) + "\n")
    })
}

(async () => {
    // 1.1
    await writeInJson()
    // 1.2
    await writeInTxtExactFormat()
    // 1.3
    await writeInTxt(csvToJson, csvFilePath)
})()

///////////

const { Readable, Writable } = require("stream")

async function fromCsvToTxt(callback, filePath) {
    const arrayOfObj = await callback(filePath)
    const readable = Readable.from(arrayOfObj)

    readable.on("data", (chunk) => {
        console.log(chunk) // will be called once with `"input string"`
    })
}

fromCsvToTxt(csvToJson, csvFilePath)





