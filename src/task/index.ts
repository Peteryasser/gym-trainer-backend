import { NextApiRequest, NextApiResponse } from "next";
import supabase from '../app/supabaseClient';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { data, error } = await supabase
    .from('countries')
    .select()
  }
}
