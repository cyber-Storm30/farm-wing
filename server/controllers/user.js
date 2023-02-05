import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json("You are not yet registered");
    }
    const validated = await bcrypt.compare(password, user.password);
    if (!validated) {
      return res.status(403).json("Wrong credentials");
    } else {
      const { password, ...newUser } = user._doc;
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { name, image, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name: name,
      email: email,
      image: image,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
