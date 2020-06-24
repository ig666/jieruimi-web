import { handleService } from "./request";
export default {
  fileUpload(data) {
    return handleService("/api/fileUpload", data, "POST");
  }
};
