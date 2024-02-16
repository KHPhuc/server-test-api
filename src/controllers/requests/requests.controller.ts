import { https } from "follow-redirects";
import url from "url";
import { Request, Response } from "express";
import axios from "axios";

// Make request and response for front
export const requests = async (req: Request, res: Response) => {
  const body = req.body;

  const urlParse = url.parse(body.url, true);

  const options: any = {
    method: body.method.toUpperCase(),
    hostname: urlParse.hostname,
    path: urlParse.path,
    // maxRedirects: 20,
  };

  if (Object.keys(body.headers).length) {
    options.headers = body.headers;
  }

  let chunks: any = [];
  const startTime = new Date().getTime();
  var request = https.request(options, (response) => {
    response.on("data", function (chunk) {
      chunks.push(chunk);
    });

    response.on("end", function (chunk: any) {
      var body = Buffer.concat(chunks);
      // console.log(body.toString());
      res.send({
        content: body.toString(),
        elapsed: new Date().getTime() - startTime,
        headers: response.headers,
        statusCode: response.statusCode,
      });
    });

    response.on("error", function (error) {
      console.error(error);
    });
  });

  if (body.data) {
    request.write(body.data);
  }
  request.end();
};
