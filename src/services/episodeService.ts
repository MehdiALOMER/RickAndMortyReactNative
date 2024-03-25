import { ApiConstant } from "@/constants/apiConstant";
import { NetworkManager } from "@/utils/network/networkManager";

export class EpisodeService {

    static async getEpisodeList(page: number) {
        try {
            let url = `${ApiConstant.episodeListUrl}?page=${page}`;
            let response = await NetworkManager.get(url);
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    }

}   