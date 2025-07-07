import { CommetsModel } from "../models/Comment.js";
import { UserModel } from "../models/UserModel.js";

export const setComment = async (req, res) => {
  try {
    const { commet,movie_id, user_id } = req.body;
    if (!(commet && movie_id && user_id)) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    };

    const userAndCommentExists = await CommetsModel.findOne({
      where:
      { movie_id:movie_id,
        user_id:user_id
      }});

    if (userAndCommentExists) {
      return res.status(409).json({ error: "You have already commented on this movie" });
      }
    const newCommets = await CommetsModel.create({
      commet: commet,
      movie_id: movie_id,
      user_id: user_id,
      message:"Comment added successfully"
    });
    res.status(201).json(newCommets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const commentsData = await CommetsModel.findAll(
      
      {
        where:{movie_id: req.params.id},
        include: [{ model: UserModel, attributes: ["user","email"] }],
      }
    );
    res.status(200).json( {commentsData , message: "Comments fetched successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//async y await ivestigar a fondo
