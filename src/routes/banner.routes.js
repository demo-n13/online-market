import express from "express";
import {pool} from "../config/banner.config.js";

const router = express.Router();

router.delete('/banners', async (req, res) => {
    try {
        const { productId, imageUrl } = req.body;

        if (!productId || !imageUrl) {
            return res.status(400).send({ message: 'productId va imageUrl talab qilinadi' });
        }

        const result = await pool.query(
            'DELETE FROM banners WHERE product_id = $1 AND image_url = $2 RETURNING *',
            [productId, imageUrl]
        );

        if (result.rowCount === 0) {
            return res.status(404).send({ message: 'Banner topilmadi' });
        }

        res.send({ message: 'Banner muvaffaqiyatli o\'chirildi', banner: result.rows[0] });
    } catch (error) {
        res.status(500).send({ message: 'O\'chirishda xatolik yuz berdi', error });
    }
});

export default router;
