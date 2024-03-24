import { ApiConstant } from "@/constants/apiConstant";
import { NetworkManager } from "@/utils/network/networkManager";

export class EpisodeService {

    static async getEpisodeList() {
        try {
            let response = await NetworkManager.get(ApiConstant.episodeListUrl);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }

}   