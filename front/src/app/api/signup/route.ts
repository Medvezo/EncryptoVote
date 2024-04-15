// app/api/signup.ts
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import axiosBase from "@/helpers/axiosBase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const response = await axiosBase.post(
      "/signup",
      req.body
    );
    return res.status(response.status).json(response.data);
  } catch (error: any) {
    return res.status(error.response.status).json(error.response.data);
  }
}
