"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";
import User from "@/database/user.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectToDatabase();

    const { userId, questionId } = params;

    // Update the view count for the question
    await Question.findByIdAndUpdate(questionId, {
      $inc: { views: 1 },
    });

    const question = await Question.findOne({ _id: questionId });

    if (question) {
      await User.findByIdAndUpdate(question.author, {
        $inc: { reputation: 1 },
      });
    }

    if (userId) {
      await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      // Create interaction
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function name(params: GetAllUsersParams) {
//   try {
//     connectToDatabase();
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
