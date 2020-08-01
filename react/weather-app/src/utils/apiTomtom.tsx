import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://api.tomtom.com/",
    responseType: "json"
});

export async function findCities(query: string, limit: number): Promise<string[]> {
    try {
        let offset = 0;
        let attempts = 2;
        const cities = new Set();
        while (cities.size < limit && attempts-- > 0) {
            let respObj = await axiosInstance.get(`/search/2/search/${encodeURIComponent(query)}.json`, {
                params: {
                    key: process.env.API_KEY_TOMTOM,
                    typeahead: true,
                    ofs: offset,
                    idxSet: 'Geo',
                    maxFuzzyLevel: 1,
                }
            });
            jsonToCity(respObj.data).map(item => cities.add(item));
            offset += limit;
        }
        return [...cities].splice(0, limit) as string[];
    } catch (error) {
        if (error.response.status === 429) {
            await new Promise(r => setTimeout(r, 10000));
        }
        return [];
    }
}

function jsonToCity(jsonObj: any): string[] {
    try {
        let results = jsonObj.results;
        let places = [];
        for (let val of results) {
            let city = val.address.municipality;
            if (city && city.length > 0) places.push(city);
        }
        return places;
    } catch (error) {
        console.log(error);
        return [];
    }
}
