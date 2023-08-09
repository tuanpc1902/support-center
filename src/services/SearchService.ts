import httpRequest from "../utils/HttpRequest.ts";

// const searchService = async (q, type = 'less') => {
//     try {
//         const res = await httpRequest.get('search/users?q=', {
//             params: {
//                 q,
//                 type,
//             },
//         });
//         return res.data;
//     } catch (error) {
//         console.log(error);
//     }
// };

export default class SearchService {
    static async findUserInGithub(username: string){
        try {
            const res = await httpRequest.get(`search/users?q=${username}`);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }
}
