const router = require("express").Router();
const pool = require("../../config/database");











//Update Product

const putUpdateProductRouter =  async (req, res, next) => {

    const connection = await pool.promise().getConnection()

    try {
       
        const sqlUpdateProduct = `UPDATE products SET ? WHERE id = ?`;
    
        const dataUpdateProduct = [req.body.updatedProduct, req.body.params.id]
        try {
           const result =  await connection.query(sqlUpdateProduct, dataUpdateProduct) 
                   
            res.status(201).send({
                message: `Produk berhasil di update`,               
            });
            connection.release();

        } catch (error) {
            connection.release();
            next(error)
        } 
    } catch (error) {
        connection.release();
        next(error);
    }
};













router.put("/:productsId", putUpdateProductRouter)



module.exports = router