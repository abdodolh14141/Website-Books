import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });
    res.status(200).json({ session });
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
