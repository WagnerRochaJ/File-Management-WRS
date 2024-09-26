const Racks = require('../models/Racks');
const Shelfs = require('../models/Shelfs')

exports.createrack = async (req, res) => {
  try {
    const { code, description, acronym, idShelf } = req.body;
    const rack = await Racks.create({ code_rack:code, description_rack:description, acronym_rack:acronym, fk_id_shelf:idShelf });
    res.status(201).json({
        message: 'rack created successfully',
        rack
    });
  } catch (err) {
    res.status(500).json({ 
        message: 'Error to created rack',
        error: err
     });
  }
};

exports.getracks = async (req, res) => {
  try {
    const rack = await Racks.findAll({ include: Shelfs });
    res.status(200).json({
        message: 'rack list',
        rack
    });
  } catch (err) {
    res.status(500).json({ message: 'Error to found racks',
        error: err
     });
  }
};

exports.updaterack = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, description, acronym, idShelf } = req.body;
    const rack = await Racks.findByPk(id);
    if (!rack) return res.status(404).json({ err: 'rack not found' });

    const rackUpdated = await rack.update({ code_rack:code, description_rack:description, acronym_rack:acronym, fk_id_shelf:idShelf  });
    res.status(200).json({
        message: 'rack updated',
        rackUpdated
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro to update rack',
        error: err
     });
  }
};

exports.deleterack = async (req, res) => {
  try {
    const { id } = req.params;
    const rack = await Racks.findByPk(id);
    if (!rack) return res.status(404).json({ message: 'rack not found' });

    await rack.destroy();
    res.status(200).json({
        message: 'rack created successfully',
        rack
    });
  } catch (err) {
    res.status(500).json({ err: 'Error to delete rack',
        error: err
     });
  }
};
