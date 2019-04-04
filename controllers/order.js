const Order = require('../models/order')
const errorHandler = require('../utils/errorhandler')

module.exports.getAll = async function (req ,res) {

    const query = {
	user: req.user.id,
    }

    // data start
    if (req.query.start){
	query.date = {
	    $gte: req.query.start
	}
    }
    if (req.query.end){
	if (!query.date){
	    query.date = {}
	}
	query.date['$lte'] =  req.query.end
    }
    
    if(req.query.order){
	query.order =  +req.query.order
    }
    

    try{
	const  orders = await Order
	.find(query)
	.sort({date:-1})
	.skip(+req.query.ofset)
	.limit(+req.query.limit)

    res.status(200).json(orders)
    }catch (e){
     errorHandler(res, e)
    }
    
}


module.exports.create = async function (req ,res) {
    try{
        const lastOrder =  await Order
        .fundOne({user: req.user.id })
        .sort({date: -1})
        
    const maxOrder = lastOrder ? lastOrder.order : 0
    
    const order = await new Order({
	list: req.body.list,
	user: req.user.id,
	order: maxOrder+1
    }).save()
                           
                           
	res.status(201).json(order)
    } catch (e){
	errorHandler(res, e)
    }

}

