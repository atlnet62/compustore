import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import  Model from '../models/model.js';

const {TOKEN_SECRET} = process.env;
const saltRounds = 10;

/*****************************************************************************************************/
/***                                                                                               ***/
/***                                      CHECK OF THE TOKEN                                       ***/
/***                                                                                               ***/
/*****************************************************************************************************/


export const selectUser = async (request, response) => {

    const dataUser = {
        key: request.params.uuid,
        query: "SELECT * FROM user WHERE uuid = ?"
    }

    try {

        const user = await Model.getDataByKey(dataUser);

        response.status(200).json({
            msg: "user retrieved",
            result: user[0],
        });
        return;
    } catch (error) {
        response.status(500).json({
            error: error,
        })
    }
}


/*****************************************************************************************************/
/***                                                                                               ***/
/***                                       LOGIN USER FORM                                         ***/
/***                                                                                               ***/
/*****************************************************************************************************/

export const signin = async (request, response) => {
    
    const {email, password} = request.body;
    const datasCheckUser = {
        key: email,
        query: "SELECT * FROM user WHERE email = ?",
    }
    try {
        
        const checkUser = await Model.getDataByKey(datasCheckUser);
        const isSamePwd = checkUser[0] ? await bcrypt.compare(password, checkUser[0].password) : null;

        if(!checkUser[0] || !isSamePwd) {
            response.status(404).json({
                msg: "Bad Login or/and Password",
            });
            return;

        } else {
            const TOKEN = jwt.sign({uuid: checkUser[0].uuid}, TOKEN_SECRET);
            
            console.log(checkUser[0])

            response.status(200).json({
                token: TOKEN,
                isLogged: true,
                uuid: checkUser[0].uuid,
            });
        }

    } catch (error) {
        response.status(500).json({
            error: error,
        })
    }
}

/*****************************************************************************************************/
/***                                                                                               ***/
/***                                      REGISTER USER FORM                                       ***/
/***                                                                                               ***/
/*****************************************************************************************************/

export const signup = async (request, response) => {

    const {email, password} = request.body;

    try {
        bcrypt.hash(password, saltRounds, async (error, hash) => {

            const dataUser = {
                email: email, 
                password: hash,
                uuid: uuidv4(),
            }

            const query = "INSERT INTO user (email, password, alias, firstname, lastname, address, zip_code, city, phone, signup_date, role_id, isAccountValidated, uuid) VALUES (?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, now(), 1, 0, ?)";

            try {
                await Model.saveData(query, dataUser);
                response.status(200).json({
                    userIsCreated: true,
                })
            } catch {
                response.status(500).json({
                    error: error,
                })
            }
        })
    }
    catch (error) {
        response.status(500).json({
            error: error,
        })
    }
}

export const allUser = async (request, response) => {
    
    const query = "SELECT email, alias, firstname, lastname, address, zip_code, city, phone, role.title FROM user JOIN role ON role_id = role.id";

    try {
        const result = await Model.getAllDatas(query);
        response.status(200).json({
            users : result,
            isRetrieved: true,
        });
    } catch (error) {
        response.status(500).json({
            error: error,
        })
    }
}


export const removeUser = async (request, response) => {

    if (request.params.userUUID) {

        const datas = {
            key: request.params.userUUID,
            query: "DELETE FROM user WHERE uuid = ?",
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
        if (request.params.userUUID) {
            try {
                const dataUser = {
                    key: request.params.userUUID,
                    query: "SELECT email, alias, firstname, lastname, address, zip_code, city, phone, role.title FROM user JOIN role ON role_id = role.id WHERE uuid = ?",
                }

                const queryRole = "SELECT * FROM role";

                const resultRole = await Model.getAllDatas(queryRole);

                console.log(dataUser);

                const resultUser = await Model.getDataByKey(dataUser);

                response.status(200).json({
                    typeform: request.params.mode,
                    dataRoleForm : resultRole,
                    dataUserForm : resultUser,
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

export const addUser = async (request, response) => {

    const {email, password} = request.body;
    
    try {
        bcrypt.hash(password, saltRounds, async (error, hash) => {

            const dataUser = {
                email: email, 
                password: hash,
                uuid: uuidv4(),
            }

            const query = "INSERT INTO user (email, password, alias, firstname, lastname, address, zip_code, city, phone, signup_date, role_id, isAccountValidated, uuid) VALUES (?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, now(), 1, 0, ?)";

            try {
                await Model.saveData(query, dataUser);
                response.status(200).json({
                    isCreated: true,
                })
            } catch {
                response.status(500).json({
                    error: error,
                })
            }
        })
    }
    catch (error) {
        response.status(500).json({
            error: error,
        })
    }
}

export const editUser = async (request, response) => {
        
    if (request.params.userUUID) {
        
        const datas = {
            email: request.body.email,
            alias: request.body.alias,
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            address: request.body.address,
            zip_code: request.body.zip_code,
            city: request.body.city,
            phone: request.body.phone,
            role_id: request.body.role_id, 
            uuid: request.params.userUUID
        }

        const query = "UPDATE user SET email = ?, alias = ?, firstname = ?, lastname = ?, address = ?, zip_code = ?, city = ?, phone = ?, role_id = ? WHERE uuid = ? ";

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
            error: "Fatal Error : User ID doesn't exist !",
        })
    }
}