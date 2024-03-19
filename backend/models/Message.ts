import mongoose, {Types} from 'mongoose';
import User from "./User";

const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  content:{
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    },
  },
  recipient:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    },
  },
  datetime: {
    type: Date,
    required: true,
    default: () => new Date(),
  },


});

const Message = mongoose.model('Message', MessageSchema);
export default Message;