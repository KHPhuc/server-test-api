import { https } from "follow-redirects";
import url from "url";
import { Request, Response } from "express";
import * as prettier from "prettier";

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

    response.on("end", async function () {
      const time = new Date().getTime() - startTime;
      var body: any = Buffer.concat(chunks);
      body = body.toString();
      if (body.toString().indexOf("<!doctype") === 0) {
        body = await prettier.format(body, { parser: "html" });
      } else if (validJson(body)) {
        body = await prettier.format(body, {
          parser: "json-stringify",
        });
      }
      res.send({
        content: body.substring(0, body.length - 1),
        contentLength: body.length,
        elapsed: time,
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

const validJson = (text: any) => {
  if (typeof text !== "string") {
    return false;
  }
  try {
    JSON.parse(text);
    return true;
  } catch (error) {
    return false;
  }
};
