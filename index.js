// Imports
/*
const express = require("express");
const app = express();
const csv = require("csvtojson");
const cors = require("cors");
// Path to CSV
const filePath = "data/sample.csv";

app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  var ranks = {
    gold: [],
    silver: [],
    bronze: [],
    unranked: [],
  };
  csv()
    .fromFile(filePath)
    .then((jsonObj) => {
      jsonObj.forEach((person) => {
        delete person["Student Email"];
        var numTrack1Badges = parseInt(person["# of Skill Badges Completed"]);
        var numTrack2Badges = parseInt(person["# of GenAI Game Completed"]);
        //var numTrack3Badges = person["Total Completions of both Pathways"];
        if (
          numTrack1Badges === 4 && // skill badges in GCCF
          numTrack2Badges === 1 // Gen AI Completed
          //numTrack3Badges == "Yes" // total completion of both Pathways
        ) {
          ranks.gold.push(person);
        } else if (
          numTrack1Badges === 4 &&
          numTrack2Badges !== 1
          //(numTrack1Badges !== 1 && numTrack2Badges === 6)
        ) {
          ranks.silver.push(person);
        } else if (
          (numTrack1Badges > 0 &&
          numTrack1Badges < 4) ||
          numTrack2Badges === 1
        ) {
          ranks.bronze.push(person);
        } else {
          ranks.unranked.push(person);
        }
      });
      // (parseInt(a['# of Skill Badges Completed in Track 1']) + parseInt(a['# of Skill Badges Completed in Track 2']))
      // ranks.gold.sort(
      //   (a, b) =>
      //     parseInt(b["# of Skill Badges Completed"]) +
      //     parseInt(b["# of GenAI Game Completed"]) -
      //     (parseInt(a["# of Skill Badges Completed"]) +
      //       parseInt(a["# of GenAI Game Completed"]))
      // );
      // ranks.silver.sort(
      //   (a, b) =>
      //     parseInt(b["# of Skill Badges Completed"]) +
      //     parseInt(b["# of GenAI Game Completed"]) -
      //     (parseInt(a["# of Skill Badges Completed"]) +
      //       parseInt(a["# of GenAI Game Completed"]))
      // );
      // ranks.bronze.sort(
      //   (a, b) =>
      //     parseInt(b["# of Skill Badges Completed"]) +
      //     parseInt(b["# of GenAI Game Completed"]) -
      //     (parseInt(a["# of Skill Badges Completed"]) +
      //       parseInt(a["# of GenAI Game Completed"]))
      // );
      */
/*
      res.send({
        ranks,
        goldLen: ranks.gold.length,
        silverLen: ranks.silver.length,
        bronzeLen: ranks.bronze.length,
        unrankedLen: ranks.unranked.length,
      });
      */
/*
      const sortRank = (a, b) =>
        parseInt(b["# of Skill Badges Completed"]) +
        parseInt(b["# of GenAI Game Completed"]) -
        (parseInt(a["# of Skill Badges Completed"]) +
          parseInt(a["# of GenAI Game Completed"]));

      ranks.gold.sort(sortRank);
      ranks.silver.sort(sortRank);
      ranks.bronze.sort(sortRank);
      return ranks;
    });
});
// Listen to Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}...`));
*/
// Imports
const express = require("express");
const app = express();
const csv = require("csvtojson");
const cors = require("cors");

// Use environment variables for configuration
const PORT = process.env.PORT || 4000;
const filePath = process.env.CSV_FILE_PATH || "data/sample.csv";

// Middleware
app.use(cors({ origin: "*" }));

// Define a function to categorize and sort the data
const categorizeAndSortData = (data) => {
  const ranks = {
    gold: [],
    silver: [],
    bronze: [],
    unranked: [],
  };

  data.forEach((person) => {
    // Assuming property names are consistent with your CSV
    const numTrack1Badges = parseInt(person["# of Skill Badges Completed"]);
    const numTrack2Badges = parseInt(person["# of GenAI Game Completed"]);
    const numTrack3Badges = parseInt(person["# of Courses Completed"]);

    if (numTrack1Badges === 4 && numTrack2Badges === 1) {
      ranks.gold.push(person);
    } else if (
      (numTrack1Badges === 4 && numTrack2Badges !== 1) ||
      (numTrack1Badges > 2  && numTrack2Badges === 1)
    ) {
      ranks.silver.push(person);
    } else if (
          (numTrack1Badges > 0 &&
          numTrack1Badges < 4) ||
          numTrack2Badges === 1
        ) {
      ranks.bronze.push(person);
    } else {
      ranks.unranked.push(person);
    }
  });

  // Sort the ranks based on your criteria
  const sortRank = (a, b) =>
    parseInt(b["# of Skill Badges Completed"]) +
    parseInt(b["# of GenAI Game Completed"]) -
    (parseInt(a["# of Skill Badges Completed"]) +
      parseInt(a["# of GenAI Game Completed"]));

  ranks.gold.sort(sortRank);
  ranks.silver.sort(sortRank);
  ranks.bronze.sort(sortRank);

  return ranks;
};

// Define a route for processing the data
app.get("/", (req, res) => {
  csv()
    .fromFile(filePath)
    .then((jsonObj) => {
      const ranks = categorizeAndSortData(jsonObj);
      res.json({
        ranks,
        goldLen: ranks.gold.length,
        silverLen: ranks.silver.length,
        bronzeLen: ranks.bronze.length,
        unrankedLen: ranks.unranked.length,
      });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to process the data" });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
