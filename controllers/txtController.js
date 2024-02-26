//const Media = require("../Models/media");
//const OpenAI = require("openai");
const fs = require("fs");

exports.create = async (req, res) => {
  const { name } = req.body;
  let txtPaths = [];
  try {
    if (Array.isArray(req.files.txts) && req.files.txts.length > 0) {
      for (let txt of req.files.txts) {
        txtPaths.push("/" + txt.path);
      }
    }
    console.log("wait...");
    var text = "";

    var data = fs.readFileSync("temp.txt", "utf8");
    text = data.toString();
    console.log("Fetched");
    return res.send({
      msg: "Transcript fetched Successfully",
      success: true,
      txt: text,
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
