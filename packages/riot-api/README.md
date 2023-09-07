# How to use the riot-api

- create a .env file
- save your Riot Token as RIOT_TOKEN in that .env file (other names won't work)
- write the summoner name you want to search in the `getSummonerIdByName` function inside [`src/index.ts`](src/index.ts)
file
- you can add the additional parameters `index` and/or `count` to the function if you want
- run `tsc` (TypeScript Compile) in your terminal (you have to be in the project folder)
- run `node .\dist\index.js` (`dist` is the output folder)
- the ID as well as the matches will print in the console