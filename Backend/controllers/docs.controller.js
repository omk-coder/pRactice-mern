import Docs from "../models/Docs.js";

export const ReadDocs = async (req, res) => {
  try {
    console.log(res);
    const userId = req.user._id;
    const { text } = req.body;
    if (!text) {
      res.status(400).send("Please write your mini notes");
    }

    const wDocs = await Docs.create({ text, createdBy: userId });
    res.status(201).json(wDocs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const ShowDocs = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("No user found");
    }

    const userId = req.user._id;
    const allDocs = await Docs.find({ createdBy: userId });
    res.status(200).json(allDocs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const DeleteDocs = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const result = await Docs.findByIdAndDelete({ _id: id, createdBy: userId });
    if (!result) {
      res.status(404).send("Docs not found");
    }

    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const UpdateDocs = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    if (!text) {
      return res.status(400).send("Text is required");
    }
    const doc = await Docs.findOne({ _id: id, createdBy: userId });
    if (!doc) {
      return res.status(404).send("Docs not found");
    }

    doc.text = text;
    await doc.save();

    res.json(doc);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Authentication Middleware: The auth middleware is applied to each route to ensure that the user is authenticated.
// User ID from Token: The user ID is extracted from the token (req.user._id) and used to create, show, delete, and update documents.
// Security: Ensured that only authenticated users can access and modify their own documents.
