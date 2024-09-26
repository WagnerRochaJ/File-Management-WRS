const { Type_documents } = require("../models/Type_documents");

exports.createType_documents = async (req, res) => {
  try {
    const { description, code, acronym } = req.body;
    const Type_document = await Type_documents.create({
      description_type_document: description,
      code_type_document: code,
      acronym_type_document: acronym,
    });

    res.status(201).json({
        message: 'document created',
        Type_document
  });
  } catch (err) {
    res.status(500).json({ 
        message: "Erro to creat type document", 
        error: err 
    });
  }
};

exports.getType_documents = async (req, res) => {
  try {
    const Type_document = await Type_documents.findAll();
    res.status(200).json({
        message: 'documents list ',
        Type_document
    });
  } catch (err) {
    res.status(500).json({
      message: "error to found type document",
      error: err,
    });
  }
};

exports.updateType_documents = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, code, acronym } = req.body;
    const Type_documents = await Type_documents.findByPk(id);
    if (!Type_documents)
      return res
        .status(404)
        .json({ message: "type document not found" });

    await Type_documents.update({
      description_type_document: description,
      code_type_document: code,
      acronym_type_document: acronym,
    });
    res.status(200).json({
      message: 'type document updated:',
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "error to update document", error: err });
  }
};

exports.deleteType_documents = async (req, res) => {
  try {
    const { id } = req.params;
    const Type_documents = await Type_documents.findByPk(id);
    if (!Type_documents)
      return res
        .status(404)
        .json({ message: "type document not found" });

    await Type_documents.destroy();
    res.status(200).json({ message: "type document deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "error to deleting type document", error: err });
  }
};
