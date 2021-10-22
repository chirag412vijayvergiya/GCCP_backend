// Imports
const express = require("express");
const app = express();
const csv = require("csvtojson");
const cors = require("cors");
// Path to CSV
const filePath = "data/sample.csv";

app.use(cors({
    origin: "*"
}))
app.get('/', (req, res) => {
        var ranks = {
            "gold": [],
            "silver": [],
            "bronze": [],
            "unranked": []
        };
        csv().fromFile(filePath).then((jsonObj) => {
            jsonObj.forEach(person => {
                    delete person['Student Email'];
                    var numTrack1Badges = parseInt(person['# of Skill Badges Completed in Track 1']);
                    var numTrack2Badges = parseInt(person['# of Skill Badges Completed in Track 2']);
                    if (numTrack1Badges == 6 && numTrack2Badges == 6) {
                        ranks.gold.push(person);
                    } else if ((numTrack1Badges == 6 && numTrack2Badges != 6) || (numTrack1Badges != 6 && numTrack2Badges == 6)) {
                        ranks.silver.push(person);
                    } else if ((numTrack1Badges > 0 && numTrack1Badges < 6) && (numTrack2Badges < 6 && numTrack2Badges >= 0)) {
                        ranks.bronze.push(person);
                    } else {
                        ranks.unranked.push(person)
                    }
                })
                // (parseInt(a['# of Skill Badges Completed in Track 1']) + parseInt(a['# of Skill Badges Completed in Track 2']))
            ranks.gold.sort((a, b) => (parseInt(b['# of Skill Badges Completed in Track 1']) + parseInt(b['# of Skill Badges Completed in Track 2'])) - (parseInt(a['# of Skill Badges Completed in Track 1']) + parseInt(a['# of Skill Badges Completed in Track 2'])))
            ranks.silver.sort((a, b) => (parseInt(b['# of Skill Badges Completed in Track 1']) + parseInt(b['# of Skill Badges Completed in Track 2'])) - (parseInt(a['# of Skill Badges Completed in Track 1']) + parseInt(a['# of Skill Badges Completed in Track 2'])))
            ranks.bronze.sort((a, b) => (parseInt(b['# of Skill Badges Completed in Track 1']) + parseInt(b['# of Skill Badges Completed in Track 2'])) - (parseInt(a['# of Skill Badges Completed in Track 1']) + parseInt(a['# of Skill Badges Completed in Track 2'])))
            res.send({ ranks, goldLen: ranks.gold.length, silverLen: ranks.silver.length, bronzeLen: ranks.bronze.length, unrankedLen: ranks.unranked.length });
        });
    })
    // Listen to Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server on ${PORT}...`));