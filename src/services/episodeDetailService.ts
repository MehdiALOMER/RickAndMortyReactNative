import { ApiConstant } from "@/constants/apiConstant";
import { NetworkManager } from "@/utils/network/networkManager";

export class EpisodeDetailService {

    static async getEpisodeDetail(id: number) {
        try {
            let url = ApiConstant.episodeDetailUrl + id;
            let response = await NetworkManager.get(url);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async getCharacterDetails(characterUrls: string[]) {
        try {
            let response = await NetworkManager.getMultiple(characterUrls);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }

}   