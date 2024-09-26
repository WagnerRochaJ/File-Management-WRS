const Shelfs = require('../models/Shelfs');
const Corridors = require('../models/Corridors')

exports.createShelfs = async (req, res) => {
  try {
    const { code, description, acronym, idcorridor } = req.body;
    const shelfs = await Shelfs.create({ code_shelf:code, description_shelf:description, acronym_shelf:acronym, fk_id_corridor:idcorridor });
    res.status(201).json({
        message: 'shelf created succesfully',
        shelfs
    });
  } catch (err) {
    res.status(500).json({ 
        message: 'error to create shelf' ,
        error: err
    });
  }
};

exports.getShelfs = async (req, res) => {
  try {
    const shelfs = await Shelfs.findAll({ include: Corridors });
    res.status(200).json({
        message: 'shelf list: ',
        shelfs
    });
  } catch (err) {
    res.status(500).json({ 
        message: 'Error to found Shelfs' ,
        error: err
    });
  }
};

exports.updateShelfs = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, description, acronym, idcorridor } = req.body;
    const shelfs = await Shelfs.findByPk(id);
    if (!shelfs) return res.status(404).json({ message: 'Shelfs not found' });

    const shelfUpdated = await shelfs.update({ code_shelf:code, description_shelf:description, acronym_shelf:acronym, fk_id_corridor:idcorridor });
    res.status(200).json({
        message: 'shelf updated',
        shelfUpdated
    });
  } catch (err) {
    res.status(500).json({ 
        message: 'Error to update Shelfs' ,
        error: err
    });
  }
};

exports.deleteShelfs = async (req, res) => {
  try {
    const { id } = req.params;
    const shelfs = await Shelfs.findByPk(id);
    if (!shelfs) return res.status(404).json({ 
        message: 'Shelf not found',
        error: err
    });

    await shelfs.destroy();
    res.status(200).json({ message: 'Shelfs deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error to delete Shelfs',
        error: err
     });
  }
};
