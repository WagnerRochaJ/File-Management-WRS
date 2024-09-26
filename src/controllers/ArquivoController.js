const Arquivos = require("../models/Arquivos");

module.exports = {
  async createArquivo(req, res) {
    try {
      const { description, code } = req.body;
      const arquivo = await Arquivos.create({
        description_arquivo: description,
        code_arquivo: code,
      });
      res.status(201).json({
        message: "arquivo created succesfully",
        arquivo,
      });
    } catch (err) {
      res.status(500).json({
        message: "error to create arquivo",
        error: err,
      });
    }
  },

  async getArquivo(req, res) {
    try {
      const arquivo = await Arquivos.findAll();
      res.status(200).json({
        message: "arquivo list: ",
        arquivo,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error to found arquivo",
        error: err,
      });
    }
  },

  async updateArquivo(req, res) {
    try {
      const { id } = req.params;
      const { description, code } = req.body;
      const arquivo = await Arquivos.findByPk(id);
      if (!arquivo)
        return res.status(404).json({ message: "arquivo not found" });

      const arquivoUpdated = await arquivo.update({
        description_arquivos: description,
        code_arquivo: code,
      });
      res.status(200).json({
        message: "arquivo updated",
        arquivoUpdated,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error to update arquivo",
        error: err,
      });
    }
  },

  async deleteArquivo(req, res) {
    try {
      const { id } = req.params;
      const arquivo = await Arquivos.findByPk(id);
      if (!arquivo)
        return res.status(404).json({
          message: "arquivo not found",
          error: err,
        });

      await arquivo.destroy();
      res.status(200).json({ message: "arquivo deleted" });
    } catch (err) {
      res.status(500).json({ message: "Error to delete arquivo", error: err });
    }
  },
};
