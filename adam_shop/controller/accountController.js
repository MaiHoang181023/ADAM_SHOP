const { account } = require('../model/model.js');

const accountController = {
  register: async (req, res) => {
    try {
      const { username, password, confirmPassword } = req.body;
      const checkValidUsername = await account.find({ username: username });
      if (checkValidUsername.length !== 0) {
        res.status(400).json('tên tài khoản đã tồn tại!');
      } else {
        if (confirmPassword === password) {
          const newUser = new account({ username, password });
          const User = await newUser.save();
          res.status(200).json('đăng kí thành công!');
        } else {
          res.status(400).json('xác nhận mật khẩu sai!');
        }
      }
    } catch (err) {
      res.status(400).json(err);
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (username && password) {
        const user = await account
          .findOne({ username: username })
          .then((user) => {
            if (!user) {
              return res
                .status(400)
                .json('Username hoặc password không chính xác!');
            }
            const checkUser = user.password === password ? 1 : 0;
            if (!checkUser) {
              return res
                .status(400)
                .json('Username hoặc password không chính xác!');
            }
            res.status(200).json('Đăng nhập thành công');
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        return res.status(400).json('Bạn phải nhập đủ username và password!');
      }
    } catch (err) {
      res.json(err);
    }
  },
  deleteAccount: async (req, res) => {
    try {
      const { username } = req.body;
      await account
        .findOneAndDelete({ username: username })
        .then((res) => {
          //if succeded do this block of code
          res.json('delete successfully');
        })
        .catch((err) => {
          //catch error
          res.json(err);
        });
    } catch (err) {
      res.json(err);
    }
  },
};

module.exports = accountController;
