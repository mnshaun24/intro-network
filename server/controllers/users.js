import User from "../models/User";

// READ
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.messge });
  }
};

export const getUserSavedPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const posts = await Promise.all(
      user.savedPosts.map((id) => User.findById(id))
    );
    const formattedPosts = posts.map(({ _id, description }) => {
      return { _id, description };
    });
    res.status(200).json(formattedPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE
export const saveDeletePosts = async (req, res) => {
  try {
    const { id, postId } = req.params;
    const user = await User.findById(id);

    if (user.savedPosts.includes(postId)) {
      user.savedPosts = user.savedPosts.filter((id) => id !== postId);
    } else {
      user.savedPosts(push(postId));
    }

    await user.save();

    const posts = await Promise.all(
      user.savedPosts.map((id) => User.findById(id))
    );
    const formattedPosts = posts.map(({ _id, description }) => {
      return { _id, description };
    });

    res.status(200).json(formattedPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
