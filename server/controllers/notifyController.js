const Notifies = require("../models/notifyModel");

const notifyController = {
  createNotify: async (req, res) => {
    try {
      const { id, recipients, url, text, content, image } = req.body;

      if (recipients.includes(req.user._id.toString())) return;

      const notify = new Notifies({
        id,
        recipients,
        url,
        text,
        content,
        image,
        user: req.user._id,
      });

      await notify.save();
      return res.success(notify);
    } catch (err) {
      return res.error(500, err.message);
    }
  },
  removeNotify: async (req, res) => {
    try {
      const notify = await Notifies.findOneAndDelete({
        id: req.params.id,
        url: req.query.url,
      });

      return res.json({ notify });
    } catch (err) {
      return res.error(500, err.message);
    }
  },
  getNotifies: async (req, res) => {
    try {
      const notifies = await Notifies.find({ recipients: req.user._id })
        .sort("-createdAt")
        .populate("user", "avatar username");

      return res.success(notifies);
    } catch (err) {
      return res.error(500, err.message);
    }
  },
  isReadNotify: async (req, res) => {
    try {
      const notifies = await Notifies.findOneAndUpdate(
        { _id: req.params.id },
        {
          isRead: true,
        }
      );

      return res.json({ notifies });
    } catch (err) {
      return res.error(500, err.message);
    }
  },
  deleteAllNotifies: async (req, res) => {
    try {
      const notifies = await Notifies.deleteMany({ recipients: req.user._id });

      return res.json({ notifies });
    } catch (err) {
      return res.error(500, err.message);
    }
  },
};

module.exports = notifyController;
