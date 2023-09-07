import {MATCH_REGION} from "./enums/matchRegion.enum";
require('dotenv').config();

export async function getMatchIdBySummonerId(puuid: string, region: MATCH_REGION, start_index: number = 0, count: number = 20) {
    try {
        const response = await fetch(
            `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start_index}&count=${count}`, {
                method: 'GET',
                headers: {
                    'X-Riot-Token': process.env.RIOT_TOKEN,
                    Accept: 'application/json',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        return await response.json();

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