import { AuthContext } from "@/src/providers/AuthProvider";
import { supabase } from "@/src/utils/supabase";
import { useContext, useEffect, useState } from "react";

const useImageData = () => {
  const [data, setData] = useState<any[]>([]);
  const authContext = useContext(AuthContext);

  const fetchImages = async () => {
    const data = await supabase
      .from("saved_images")
      .select("*")
      .eq("user_id", authContext.user!.id);

    return data;
  };

  useEffect(() => {
    fetchImages().then((e) => {
      setData(e.data ?? []);
    });
  }, []);

  return {
    data,
  };
};

export { useImageData };
