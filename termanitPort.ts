// "tcp-port-used" module used for checking if "PORT" is in use or not
import { check } from "tcp-port-used";
// "kill-port-process" module used to kill any port on given "PORT"
import { killPortProcess as killPort } from "kill-port-process";

export default function terminate(PORT: number | string) {
  const port = typeof PORT == "string" ? Number.parseInt(PORT) : PORT;
  return new Promise((res, rej) => {
    check(port).then((value) => {
      if (value) {
        killPort(PORT).then(() => {
          res(`server on port : ${PORT} terminated`);
        });
      } else {
        rej();
      }
    });
  });
}
