const Boxes = require('../models/boxs');
const Racks = require('../models/Racks');

exports.createbox = async (req, res) => {
  try {
    const { description,code,idRack } = req.body;
    const box = await Boxes.create({description_box:description, code_box:code,fk_id_rack:idRack});
    res.status(201).json({
        message: 'box created succesfully',
        box
    });
  } catch (err) {
    res.status(500).json({ 
        message: 'error to create box' ,
        error: err
    });
  }
};

exports.getbox = async (req, res) => {
  try {
    const box = await Boxes.findAll({include: Racks});
    res.status(200).json({
        message: 'box list: ',
        box
    });
  } catch (err) {
    res.status(500).json({ 
        message: 'Error to found box' ,
        error: err
    });
  }
};

exports.updatebox = async (req, res) => {
  try {
    const { id } = req.params;
    const { description,code } = req.body;
    const box = await Boxes.findByPk(id);
    if (!box) return res.status(404).json({ message: 'box not found' });

    const boxUpdated = await box.update({description_boxs:description, code_box:code});
    res.status(200).json({
        message: 'box updated',
        boxUpdated
    });
  } catch (err) {
    res.status(500).json({ 
        message: 'Error to update box' ,
        error: err
    });
  }
};

exports.deletebox = async (req, res) => {
  try {
    const { id } = req.params;
    const box = await Boxes.findByPk(id);
    if (!box) return res.status(404).json({ 
        message: 'box not found',
        error: err
    });

    await box.destroy();
    res.status(200).json({ message: 'box deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error to delete box',
        error: err
     });
  }
};
