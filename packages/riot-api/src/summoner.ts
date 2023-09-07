import {SummonerInterface} from "./models/summoner.interface";
import {SUMMONER_REGION} from "./enums/summonerRegion.enum";
require('dotenv').config();

export async function getSummonerIdByName(summonerName: string, region: SUMMONER_REGION) {
    try {
        const response = await fetch(
            `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
                method: 'GET',
                headers: {
                    'X-Riot-Token': process.env.RIOT_TOKEN,
                    Accept: 'application/json',
                },
            });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result: SummonerInterface = await response.json() as SummonerInterface;
        return result.puuid;

    } catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

