import {getSummonerIdByName} from "./summoner";
import {SUMMONER_REGION} from "./enums/summonerRegion.enum";
import {getMatchIdBySummonerId} from "./match";
import {MATCH_REGION} from "./enums/matchRegion.enum";

let id: string;
let matches: string;
getSummonerIdByName("MakkuSama", SUMMONER_REGION.EUW1).then(idResult => {
    id = idResult;
    getMatchIdBySummonerId(id, MATCH_REGION.EUROPE).then(matchResult => {
            matches = matchResult;
            console.log(id, matches);
        }
    )
});

