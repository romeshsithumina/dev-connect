"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";

export async function createQuestion(params: any) {
  // eslint-disable-next-line no-empty
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = params;

    // create question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    // create the tags or get them if already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        // find something (filter)
        { name: { $regex: new RegExp(`${tag}$`, "i") } },
        // perform action on the found thing (update)
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        // additional options
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });
  } catch (error) {}
}
