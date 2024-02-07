import fs from "fs";
import path from "path";

function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, text, eventId } = req.body;

    //validation
    if (
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).send({
        message: "Invalid comments data",
      });
      return;
    }

    const commentData = {
      id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };

    try {
      const pathComments = path.join(process.cwd(), "data", "comments.json");
      const comments = fs.readFileSync(pathComments);
      const commentsData = JSON.parse(comments);

      commentsData.push(commentData);

      fs.writeFileSync(pathComments, JSON.stringify(commentsData));

      res.status(201).send({
        message: "successfully registed  your comment",
      });
    } catch (error) {
      res.status(500).send({
        message: "error while registering the comments",
      });
    }
  }

  if (req.method === "GET") {
    try {
      const pathComments = path.join(process.cwd(), "data", "comments.json");
      const comments = JSON.parse(fs.readFileSync(pathComments));

      res.status(200).send({
        message: "all comments",
        comments,
      });
    } catch (error) {
      res.status(500).send({
        message: "error while fetching the comments",
      });
    }
  }
}

export default handler;
