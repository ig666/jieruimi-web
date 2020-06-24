import { handleService } from "./request";
const url = "/api/myUser";
const urlPgae = "/api/myUser/page";
export default {
  myUser(data, method) {
    if (method === "DELETE") {
      return handleService(url + `/${data}`, "", method);
    } else {
      return handleService(url, data, method);
    }
  },
  getlistByPage(data) {
    return handleService(urlPgae, data);
  }
};
