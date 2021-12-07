const Comic = require("../models/Comics");

exports.getComics = (req, res) => {
  res.json({ title: "otis otis panic", id: 0 });
};

exports.postComics = (req, res) => {
  console.log("posting comics");
  const { title, description, author, postDate } = req.body;
  // const { content } = req.file.content;

  try {
    const comics = Comic.create({
      title,
      description,
      author,
      // postDate,
      // content,
    });

    res.status(201).json({ succes: true, message: "content was uploaded" });
  } catch (error) {
    res
      .status(404)
      .json({ succes: false, message: "content could not be uploaded" });
  }
};
