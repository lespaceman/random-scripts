
const csv = require('csv-parser')
const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs')

const results = [];
fs.createReadStream('input/content_usage.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        const counts = {};
        results.forEach(usage => {
            let asstetId = usage.asset_id;
            counts[asstetId] = (counts[asstetId] || 0) + 1;
        });
        console.log(counts);
        let countArr = [counts];
        const csv = new ObjectsToCsv(countArr);
        csv.toDisk('output/view_counts.csv');
    });


