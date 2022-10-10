export const addPurchase = (request, response) => {


    const dataPurchase = {
        total_price: request.body.total_price, //somme total price datapurchasedetail
        date_purchase: request.body.date_purchase,
        isPayed: 0,
        user_uuid: request.params.uuid,
    };

    const dataPurchaseDetail = {
        id: request.body.id, 
        qty_purchased: request.body.qty_purchased, 
        total_price: request.body.total_price,
        purchase_id: request.body.purchase_id, 
        product_id: request.body.product_id
    };


    console.log(dataPurchaseDetail);
    console.log(dataPurchase)

};
