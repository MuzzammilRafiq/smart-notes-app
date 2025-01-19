import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";

const SUPABASE_URL = "https://wgscvahuietzayguoryd.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indnc2N2YWh1aWV0emF5Z3VvcnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1Mjc4NTMsImV4cCI6MjA1MDEwMzg1M30.0ZM42AHmmprsn7tXRWM6YCWwLvR3wIW5IW_a4x8wkD0";
// const GEMINI_API_KEY = Deno.env.get("_GEMINI_API_KEY")!;

// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req: Request) => {
  // console.log(req); 
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }
    const { text, id } = await req.json();
    if (!text || !id) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const randomArray = Array.from({ length: 784 }, () => Math.random());
    // const { data, error } = await supabaseClient
    //   .from("notes_embed")
    //   .update({
    //     embed: randomArray,
    //   })
    //   .eq("id", id);
    // get from supabaseClient
    const { data, error } = await supabaseClient
      .from("notes_embed")
      .select("*")
      .eq("id", id);
    console.log(data);
    if (error) {
      console.log(error);
      throw error;
    }

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "success",
        data: data,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.log(error);
    return new Response(
      JSON.stringify({
        error: error,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
