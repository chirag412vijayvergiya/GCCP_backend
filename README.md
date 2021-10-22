# 30 Days of Google Cloud API
Creates a Ranking Dashboard for **30 Days of Google Cloud** by taking data from Daily Progress Report received by Cloud Facilitators. It Ranks the participants into 4 Categories sorted on the basis of Number of Skill Badges Completed.

### API Usage
Creates a Ranking Dashboard Data from Progress Report CSV which sorts the participants into 4 Categories:
- **GOLD**: Who have completed **both the tracks**.
- **SILVER**: Who have completed **at least one track**.
- **BRONZE**: Who have **started labs**, but **haven't completed even 1 track**.
- **UNRANKED**: Who have **not started even 1 lab**.

### API Response
Returns a JSON Object with the following schema:
```json
{
    "ranks" : {
        "gold": List of Objects of Profile Info,
        "silver": List of Objects of Profile Info,
        "bronze": List of Objects of Profile Info,
        "unranked": List of Objects of Profile Info
    }, 
    "goldLen": Int of ranks.gold.length,
    "silverLen": Int of ranks.silver.length,
    "bronzeLen": Int of ranks.bronze.length,
    "unrankedLen": Int of ranks.unranked.length
} 
```

### Setup Locally
- Clone this Repo
```bash
$ git clone https://github.com/Google-Developer-Student-Club-Poornima/30DoGCP-dashboard-backend && cd 30DoGCP-dashboard-backend
```
- NPM Install Dependencies
```
npm i
```
- Save your progress report in `/data` folder as `data.csv`.
- Run on Local Server
```
npm start
```
- Open [http://localhost:4000](http://localhost:4000)