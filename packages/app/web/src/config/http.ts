import { getAccessToken, HttpClientFactory } from "vegaui";
import { Env } from "./Env";



export const  http =  new HttpClientFactory(
	Env.API_URL || "",
	getAccessToken,
	"1.0.0",
	120000
      );