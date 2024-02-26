//const Media = require("../Models/media");
//const OpenAI = require("openai");
const fs = require("fs");
const pdf = require("pdf-parse");
exports.create = async (req, res) => {
  const { name } = req.body;
  let audiosPaths = [];
  try {
    if (Array.isArray(req.files.audios) && req.files.audios.length > 0) {
      for (let audio of req.files.audios) {
        audiosPaths.push("/" + audio.path);
      }
    }
    console.log("wait...");
    let dataBuffer = fs.readFileSync("temp.pdf");
    var txt = "";
    await pdf(dataBuffer).then(function (data) {
      txt = data.text;
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
