const { Review, Order, Sale } = require("../../db");

const postEventReview = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el id del evento de la solicitud
        const sales = await Sale.findByPk(id);
        
        if (!sales) {
            return res.status(404).json({ error: "Evento de venta no encontrado" });
        }

        const order = await Order.findByPk(sales.idOrder);
        const buyer = await Order.findByPk(order.idBuyer);

        const {
            score,
            comment,
            approved,
            userId
        } = req.body;

        if (!score || !comment || approved === undefined || !userId) {
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        if (userId === buyer.id) {
            const createEventReview = await Review.create({
                score,
                comment,
                approved,
                userId
            });

            res.status(200).json(createEventReview);
        } else {
            res.status(403).json({ error: "Solo usuarios que han comprado este evento pueden realizar reviews" });
        }
    } catch (error) {
        res.status(400).json({ error: "Hubo un error al crear la review" });
    }
};

module.exports = postEventReview;
