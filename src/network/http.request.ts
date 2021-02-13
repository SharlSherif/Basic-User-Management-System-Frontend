import axios from "axios";
import HttpMethod from "../enum/http.request.enum";
import HttpRequest from "../interfaces/http.request.interface";

const Request = async (params: HttpRequest) => {
  const { data, endpoint, type } = params;
  const url = `${process.env.REACT_APP_API_URL}/${endpoint}`;

  try {
    let method;
    switch (type) {
      case HttpMethod.POST:
        method = await axios.post(url, data);
        break;

      case HttpMethod.PATCH:
        method = await axios.patch(url, data);
        break;

      case HttpMethod.DELETE:
        method = await axios.delete(url);
        break;

      default:
        method = await axios.get(url);
        break;
    }

    console.log(method);
    return method.data;
  } catch (e) {
    throw new Error(e);
  }
};

export default Request;
