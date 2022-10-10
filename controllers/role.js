import Model from "../models/model.js";

export const allRole = async (request, response) => {
    const query = "SELECT id AS roleID, title FROM role";

    try {
        const result = await Model.getAllDatas(query);
        response.status(200).json({
            roles: result,
            isRetrieved: true,
        });
    } catch (error) {
        response.status(500).json({
            error: error,
        });
    }
};

export const removeRole = async (request, response) => {
    if (request.params.roleID) {
        const datas = {
            key: request.params.roleID,
            query: "DELETE FROM role WHERE id = ?",
        };

        try {
            await Model.delDataByKey(datas);
            response.status(200).json({
                isRemoved: true,
            });
        } catch (error) {
            response.status(500).json({
                error: error,
            });
        }
    } else {
        response.status(500).json({
            error: "Fatal Error : role ID doesn't exist !",
        });
    }
};

export const checkForm = async (request, response) => {
    if (request.params.mode === "edit") {
        if (request.params.roleID) {
            try {
                const data = {
                    key: request.params.roleID,
                    query: "SELECT id AS roleID, title FROM role WHERE id = ?",
                };

                const result = await Model.getDataByKey(data);

                response.status(200).json({
                    typeform: request.params.mode,
                    dataForm: result,
                    isRetrieved: true,
                });
            } catch (error) {
                response.status(500).json({
                    error: error,
                });
            }
        } else {
            response.status(500).json({
                error: "Fatal Error : Role ID doesn't exist !",
            });
        }
    }
};

export const addRole = async (request, response) => {
    const { title } = request.body;

    try {
        const data = {
            title: title,
        };

        const query = "INSERT INTO role (title) VALUES (?)";

        try {
            await Model.saveData(query, data);
            response.status(200).json({
                isCreated: true,
            });
        } catch {
            response.status(500).json({
                error: error,
            });
        }
    } catch (error) {
        response.status(500).json({
            error: error,
        });
    }
};

export const editRole = async (request, response) => {
    if (request.params.roleID) {
        const datas = {
            title: request.body.title,
            id: request.params.roleID,
        };

        const query = "UPDATE role SET title = ? WHERE id = ?";

        try {
            await Model.saveData(query, datas);

            response.status(200).json({
                isEdited: true,
            });
        } catch (error) {
            response.status(500).json({
                error: error,
            });
        }
    } else {
        response.status(500).json({
            error: "Fatal Error : Role ID doesn't exist !",
        });
    }
};
