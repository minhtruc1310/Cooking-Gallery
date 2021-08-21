import axios from "axios";

export default axios.create(
    {
        baseURL: 'https://cooking-gallery-8d52f-default-rtdb.asia-southeast1.firebasedatabase.app/',
        withCredentials: false,
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
      }
    }
)