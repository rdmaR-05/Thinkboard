import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config();
// rate limiter that allows 100 requests per 60 secs
const ratelimit = new Ratelimit({
    redis:Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(11,"60 s")
});
export default ratelimit;