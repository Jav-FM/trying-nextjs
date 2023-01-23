import { validEmailRegex } from "../../../utils/constants";
import { v4 as uuidv4 } from "uuid";

const data = [
  {
    id: "838264",
    email: "javiera@gmail.com",
    name: "Javiera",
    text: "A cool comment!",
  },
  {
    id: "984345",
    email: "javiera@gmail.com",
    name: "Javiera",
    text: "Another cool comment!",
  },
];

const handler = (req, res) => {
  if (req.method === "GET") {
    res.status(200).json({
      data,
    });
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
      id: uuidv4.slice(0, 6),
      email,
      name,
      text,
    };
    data.push(messageObject);
    res.status(201).json({ message: "Comment added.", data: messageObject });
  } else {
    res.status(404);
  }
};

export default handler;
