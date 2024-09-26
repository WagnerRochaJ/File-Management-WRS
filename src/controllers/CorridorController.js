const Corridor = require('../models/Corridors');

exports.createCorridor = async (req, res) => {
  try {
    const { description, code,fkarquivo } = req.body;
    const corridor = await Corridor.create({ description_corridor:description, code_corridor:code,fk_id_arquivo:fkarquivo });
    res.status(201).json({
      message: 'corridor created',
      corridor});
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar corridor' ,
      error: err
    });
  }
};

exports.getCorridores = async (req, res) => {
  try {
    const corridors = await Corridor.findAll();
    res.status(200).json({
      message: 'corridors list:',
      corridors
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Erro when list corridors' ,
      error: err
    });
  }
};

exports.updateCorridor = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, code,fkarquivo } = req.body;
    const corridor = await Corridor.findByPk(id);
    if (!corridor) return res.status(404).json({ error: 'Corridor not found' });

    await corridor.update({description_corridor:description, code_corridor:code,fk_id_arquivo:fkarquivo});
    res.status(200).json({
      message: 'corridor updated',
      corridor
    });
  } catch (err) {
    res.status(500).json({ 
      message: 'Erro to update corridor' ,
      error: err
    });
  }
};

exports.deleteCorridor = async (req, res) => {
  try {
    const { id } = req.params;
    const corridor = await Corridor.findByPk(id);
    if (!corridor) return res.status(404).json({ error: 'Corridor não encontrado' });

    await corridor.destroy();
    res.status(200).json({ message: 'Corridor deleted' });
  } catch (err) {
    res.status(500).json({ 
      message: 'Error to delete corridor',
      error: err 
    });
  }
};
