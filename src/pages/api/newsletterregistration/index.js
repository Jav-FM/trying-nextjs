import { validEmailRegex } from "../../../utils/constants";

const handler = (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email || !email.match(validEmailRegex)) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }
    res.status(201).json({ message: "Email was register.", data: email });
  } else {
    res.status(404);
  }
};

export default handler;
