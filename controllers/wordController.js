//const Media = require("../Models/media");
//const OpenAI = require("openai");
const fs = require("fs");
const WordExtractor = require("word-extractor");
const extractor = new WordExtractor();

exports.create = async (req, res) => {
  const { name } = req.body;
  let docxPaths = [];
  try {
    if (Array.isArray(req.files.docxs) && req.files.docxs.length > 0) {
      for (let docx of req.files.docxs) {
        docxPaths.push("/" + docx.path);
      }
    }
    console.log("wait...");
    var txt = "";
    const extracted = extractor.extract("temp.docx");
    await extracted.then((docx) => {
      txt = docx.getBody();
    });
    console.log("fetched");
    return res.send({
      msg: "Transcript fetched Successfully",
      success: true,
      txt,
    });
  } catch (error) {
    console.log("error", error);
    return res.send({
      msg: "Error in fetching transcript",
      success: false,
      error,
    });
  }
  //   try {
  //     const createdMedia = await Media.create({
  //       name,
  //       audios: audiosPaths,
  //     });

  //     res.json({ message: "Media created successfully", createdMedia });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).json(error);
  //   }
};
