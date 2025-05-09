const API = import.meta.env.VITE_API_URL;

export type TypeMessage = {
  id: number;
  message: string;
  type: "response" | "request";
  // "2025-05-07T04:18:38.473Z";
  update: string;
};

export default async function getAIResponse() {
  const response = await fetch(API + "/api/ai");
  if (response.ok) {
    const result = await response.json();
    return result as TypeMessage[];
  }
}
