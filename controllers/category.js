import Model from "../models/model.js";

export const allCategory = async (request, response) => {
    
    const query = "SELECT id AS categoryID, title FROM category";

    try {
        const result = await Model.getAllDatas(query);
        response.status(200).json({
            categories : result,
            isRetrieved: true,
        });
    } catch (error) {
        response.status(500).json({
            error: error,
        })
    }
}


export const removeCategory = async (request, response) => {

    if (request.params.categoryID) {

        const datas = {
            key: request.params.categoryID,
            query: "DELETE FROM category WHERE id = ?",
        }

        try {
            await Model.delDataByKey(datas);
            response.status(200).json({
                isRemoved: true,
            });

        } catch (error) {
            response.status(500).json({
                error: error,
            })
        }
    } else {
        response.status(500).json({
            error: "Fatal Error : Category ID doesn't exist !",
        })
    }
}

export const checkForm = async (request, response) => {

    if (request.params.mode === 'edit') {
        if (request.params.categoryID) {
            try {
                const data = {
                    key: request.params.categoryID,
                    query: "SELECT id AS categoryID, title FROM category WHERE id = ?",
                }

                const result = await Model.getDataByKey(data);

                response.status(200).json({
                    typeform: request.params.mode,
                    dataForm : result,
                    isRetrieved: true,
                });

            } catch (error) {
                response.status(500).json({
                    error: error,
                })
            }
        } else {
            response.status(500).json({
                error: "Fatal Error : Category ID doesn't exist !",
            })
        }
    }
}

export const addCategory = async (request, response) => {

    const {title} = request.body;
    
    try {
        const data = {
            title: title
        }

        const query = "INSERT INTO category (title) VALUES (?)";

        try {
            await Model.saveData(query, data);
            response.status(200).json({
                isCreated: true,
            })
        } catch {
            response.status(500).json({
                error: error,
            })
        }
    }
    catch (error) {
        response.status(500).json({
            error: error,
        })
    }
}

export const editCategory = async (request, response) => {
        
    if (request.params.categoryID) {
        
        const datas = {
            title: request.body.title,
            id: request.params.categoryID
        }

        const query = "UPDATE category SET title = ? WHERE id = ?";

        try {
            await Model.saveData(query, datas);

            response.status(200).json({
                isEdited: true,
            });

        } catch (error) {
            response.status(500).json({
                error: error,
            })
        }
    } else {
        response.status(500).json({
            error: "Fatal Error : Category ID doesn't exist !",
        })
    }
}