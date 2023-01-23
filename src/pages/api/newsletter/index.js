import { validEmailRegex } from "../../../utils/helpers/constants";
import {
  connectDatabase,
  insertDocument,
} from "../../../utils/helpers/db-utils";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email || !email.match(validEmailRegex)) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }
    let client;
    try {
      client = await connectDatabase();
    } catch (e) {
      res.status(500).json({ message: "Connecting to the database failed :(" });
      return;
    }
    try {
      await insertDocument(client, "newsletter", { email });
    } catch (e) {
      res.status(500).json({ message: "Inserting data failed :(" });
      return;
    }
    res.status(201).json({ message: "Email was register.", data: email });
  } else {
    res.status(404);
  }
};

export default handler;
