import { Request } from "express";

// full URL of the server
const fullURL = (req: Request<any>, path: string) => {
  return req.protocol + "://" + req.get("host") + path;
};

export default fullURL;
