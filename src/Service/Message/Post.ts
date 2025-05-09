const API = import.meta.env.VITE_API_URL;
import { type TypeMessage } from "./List";

export default async function sendMessage(
  message: string
): Promise<TypeMessage> {
  return await fetch(API + "/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  }).then((response) => {
    return response.json();
  });
}
