const Status  = require('../models/Status');

exports.createStatus = async (req, res) => {
  try {
    const { description,code,inpossesion } = req.body;
    const status = await Status.create({ description_status:description, code_status:code,in_possesion_third:inpossesion});
    res.status(201).json({
        message: 'status created succesfully',    
        status
  });
  } catch (err) {
    res.status(500).json({ 
        message: 'error to create status', 
        error: err
    });
  }
};

exports.getStatus = async (req, res) => {
  try {
    const status = await Status.findAll();
    res.status(200).json({
        message: 'list status = ',
        status
    });
  } catch (err) {
    res.status(500).json({ 
        message: 'error to found status', 
        error: err
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { description,code,inpossesion } = req.body;
    const status = await Status.findByPk(id);
    if (!status) return res.status(404).json({ message: 'Status not found' });

    await status.update({ description_status:description, code_status:code,in_possesion_third:inpossesion });
    res.status(200).json({
        message: 'status updated',
    });
  } catch (err) {
    res.status(500).json({ 
        message: 'erro to update status', 
        error: err
    });
  }
};

exports.deleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findByPk(id);
    if (!status) return res.status(404).json({ error: 'status no found' });

    await status.destroy();
    res.status(200).json({ 
        message: 'Status deleted',
    });
  } catch (err) {
    res.status(500).json({ 
        message: 'error to delete status',
        error: err
    });
  }
};
