import {check} from "tcp-port-used";
import {killPortProcess as killPort} from "kill-port-process";

export default function terminate(
    PORT: number
) {
    return new Promise((res, rej) => {
        check(PORT).then(value => {
            if (value) {
                killPort(PORT)
                    .then(() => {
                        res(`server on port : ${PORT} terminated`);
                    })
            } else {
                rej();
            }
        });
    })

}
