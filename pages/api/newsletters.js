import fs from "fs";
import path from "path";

function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || email.trim() === "" || !email.includes("@")) {
      res.status(422).send({
        message: "evalid email address",
      });
      return;
    }

    const newLetterItem = {
      id: new Date().toISOString(),
      email,
    };

    try {
      const pathNewsLetters = path.join(
        process.cwd(),
        "data",
        "newsletters.json"
      );

      const newLetters = fs.readFileSync(pathNewsLetters);
      const newLettersData = JSON.parse(newLetters);

      newLettersData.push(newLetterItem);

      fs.writeFileSync(pathNewsLetters, JSON.stringify(newLettersData));

      res.status(201).send({
        message: "successfully registred to new letter",
      });
    } catch (error) {
      res.status(500).send({
        message: "error for register to newletters",
      });
    }
  }
}

export default handler;
