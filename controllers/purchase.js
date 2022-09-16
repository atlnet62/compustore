
export const addPurchase = (request, response) => {

    const dataPurchaseDetail = {
        detail : 
        [
            [id, qty, ttprice, purchNum, producNum],
            [id, qty, ttprice, purchNum, producNum],
            [id, qty, ttprice, purchNum, producNum],
            [id, qty, ttprice, purchNum, producNum]
        ]
    }

    const dataPurchase = {
        total_price: x, //somme total price datapurchasedetail
        isPayed: 0,
        user_uuid: request.params.uuid
    }

}