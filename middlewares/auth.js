import jwt from "jsonwebtoken";

const { TOKEN_SECRET } = process.env;

export const auth = (request, response, next) => {
    const TOKEN = request.headers["x-access-token"];

    if (TOKEN === undefined || TOKEN === "null") {
        response.status(404).json({ msg: "token not found" });
        return;
    } else {
        jwt.verify(TOKEN, TOKEN_SECRET, (err, decoded) => {
            if (err) {
                response
                    .status(401)
                    .json({ status: 401, msg: "token invalid" });
                return;
            } else {
                request.params.uuid = decoded.uuid;
                request.params.role_id = decoded.role_id;
                next();
            }
        });
    }
};
