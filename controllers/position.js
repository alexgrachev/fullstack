const Position = require('../models/Position')
const errorHandler  = require('../utils/errorhandler')


module.exports.getByCategoryID = async function (req ,res) {
    try{
	const positions = await Position.find({
	    category: req.params.categoryId,
	    user: req.user.id,
	})
	res.status(200).json(positions)
    } catch (e) {
	errorhandler(res, e)
    }

}


module.exports.create = async function (req ,res) {
    try{
    const position =  await new Position({
	name: req.body.name,
	cost: req.body.cost,
	category: req.body.category,
	user: req.user.id,
    }).save()
    res.status(201),json(position)

    } catch (e) {
	errorhandler(res, e)
    }
}

module.exports.remove  = async function (req ,res) {
    try{
    await Position.remove({_id: req.params.id})
    res.statos(200).json({
	message: 'position has been delete.'
    })
    
    
    } catch (e) {
	errorhandler(res, e)
    }
}


module.exports.update = async function (req ,res) {
    try{
    const position =  await Position.findOneAndupdate(
	{_id: req.params.id }, 
	{$set: req.body},
	{new: true}
    )
    res.status(200).json(position)
    
    } catch (e) {
	errorhandler(res, e)
    }
}
