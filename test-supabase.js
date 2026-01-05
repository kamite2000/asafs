import { supabase } from "./src/lib/supabase.js";

async function testConnection() {
  try {
    const { data, error } = await supabase.from("posts").select("*").limit(1);

    if (error) {
      console.error("Erreur de connexion:", error);
    } else {
      console.log("Connexion réussie!", data);
    }
  } catch (error) {
    console.error("Erreur:", error);
  }
}

testConnection();