import  Model from '../models/model.js';

export const selectProductByCategory = async (request, response) => {

    const data = {
        key: request.params.categoryID,
        query: "SELECT * FROM product WHERE category_id = ?"
    }

    try {
        const result = await Model.getDataByKey(data);

        response.status(200).json({
            msg: "Product retrieved",
            result: result[0],
        });
        return;
    } catch (error) {
        response.status(500).json({
            error: error,
        })
    }
}


export const selectProduct = async (request, response) => {

    const data = {
        key: `%${request.params.title}%`,
        query: "SELECT * FROM product WHERE title LIKE UPPER(?)"
    }

    try {

        const result = await Model.getDataByKey(data);

        response.status(200).json({
            msg: "Product retrieved",
            result: result[0],
        });
        return;
    } catch (error) {
        response.status(500).json({
            error: error,
        })
    }
}


export const allProduct = async (request, response) => {
    
    const query = "SELECT product.id AS productID, product.title AS product_name, content, image_name, qtyInStock, price, category.title AS category_name FROM product JOIN category ON category_id = category.id";

    try {
        const result = await Model.getAllDatas(query);
        response.status(200).json({
            products : result,
            isRetrieved: true,
        });
    } catch (error) {
        response.status(500).json({
            error: error,
        })
    }
}


export const removeProduct = async (request, response) => {

    if (request.params.productID) {

        const datas = {
            key: request.params.productID,
            query: "DELETE FROM product WHERE id = ?",
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
            error: "Fatal Error : User ID doesn't exist !",
        })
    }
}

export const checkForm = async (request, response) => {

    if (request.params.mode === 'edit') {
        if (request.params.productID) {
            try {
                const dataProduct = {
                    key: request.params.productID,
                    query: "SELECT product.title, content, image_name, qtyInStock, price, category_id, category.title AS titleCAT FROM product JOIN category ON category_id = category.id WHERE product.id = ?",
                }

                const queryCategory = "SELECT category.id AS categoryID, category.title AS titleCAT FROM category";

                const resultCategory = await Model.getAllDatas(queryCategory);

                console.log(dataProduct);

                const resultProduct = await Model.getDataByKey(dataProduct);

                response.status(200).json({
                    typeform: request.params.mode,
                    dataCategoryForm : resultCategory,
                    dataProductForm : resultProduct,
                    isRetrieved: true,
                });

            } catch (error) {
                response.status(500).json({
                    error: error,
                })
            }
        } else {
            response.status(500).json({
                error: "Fatal Error : User ID doesn't exist !",
            })
        }
    }
}

export const addProduct = async (request, response) => {

    const {title, content, image_name, qtyInStock, price, category_id} = request.body;
    
    try {
        const data = {
            title: title, 
            content: content,
            image_name: image_name,
            qtyInStock: qtyInStock,
            price: price,
            category_id: category_id
        }

        const query = "INSERT INTO product (title, content, image_name, qtyInStock, price, category_id) VALUES (?, ?, ?, ?, ?, ?)";

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

export const editProduct = async (request, response) => {
        
    if (request.params.productID) {
        
        const datas = {
            title: request.body.title, 
            content: request.body.content,
            image_name: request.body.image_name,
            qtyInStock: request.body.qtyInStock,
            price: request.body.price,
            category_id: request.body.category_id,
            id: request.params.productID
        }

        const query = "UPDATE product SET title = ?, content = ?, image_name = ?, qtyInStock = ?, price = ?, category_id = ? WHERE id = ? ";

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
            error: "Fatal Error : User ID doesn't exist !",
        });
    }
}

export const addImage = async (request, response) => {

    try {
        await request.files.image_name.mv(`public/products/${request.files.image_name.name}`);
        response.status(200).json({
            name: request.files.image_name.name,
            isUploaded: true
        });
    } catch (error) {
        response.status(500).json({
            error: error,
        });
    }
}