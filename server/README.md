# Prerequisites
- Node.js 9

If you are using Linux, you can follow these instructions for command-line installation :
https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions

# Quick start
```bash
git clone https://github.com/cheninator/coveo-challenge
cd coveo-challenge/server
npm install && npm start
```

# Using MongoDB
By default, the server will connect to mLab. To import data.json to mLab :

```bash
cd coveo-challenge/server/app/data
mongoimport -h ds117878.mlab.com:17878 -d challenge-coveo -c cities -u test -p test123! --file data.json --jsonArray
```