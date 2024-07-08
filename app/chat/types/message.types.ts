import { Sender } from "./sender.enum";

export type Message = {
  text: string;
  sender: Sender;
};