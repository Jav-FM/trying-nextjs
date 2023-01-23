import { validEmailRegex } from "../../../utils/helpers/constants";
import {
  connectDatabase,
  insertDocument,
  getDocuments,
} from "../../../utils/helpers/db-utils";

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectDatabase();
  } catch (e) {
    res.status(500).json({ message: "Connecting to the database failed :(" });
    return;
  }

  if (req.method === "GET") {
    try {
      const documents = await getDocuments(
        client,
        "comments",
        { eventId },
        { _id: -1 }
      );
      res.status(200).json({ data: documents });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Getting comments failed." });
    }
  } else if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email ||
      !email.match(validEmailRegex) ||
      !name ||
      name.trim() == "" ||
      !text ||
      text.trim() == ""
    ) {
      res.status(422).json({ message: "Invalid input." });

      return;
    }
    const messageObject = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDocument(client, "comments", messageObject);
      messageObject._id = result.insertedId;
      res.status(201).json({ message: "Comment added.", data: messageObject });
    } catch (e) {
      res.status(500).json({ message: "Inserting comment failed :(" });
    }
  } else {
    res.status(404);
  }
};

export default handler;
