import { handleService } from "./request";
const url = "/api/ReportData";
const pageUrl = "api/ReportData/page";
export default {
  report(data, method) {
    if (method === "DELETE") {
      return handleService(url + `/${data}`, "", method);
    } else {
      return handleService(url, data, method);
    }
  },
  getlistByPage(data) {
    return handleService(pageUrl, data);
  }
};
