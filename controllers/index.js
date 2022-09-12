export const homePage = (request, response) => {

    try {
        response.status(200).json({
            msg: "Welome to CompuStore.",
        })
    } catch (error) {
        response.status(500).json({
            error: error,
        })
    }
}

export const pageNotFound = (request, response) => {

    try {
        response.status(404).json({
            msg: "Error 404 : Page not Found !",
        })
    } catch (error) {
        response.status(500).json({
            error: error,
        })
    }
}