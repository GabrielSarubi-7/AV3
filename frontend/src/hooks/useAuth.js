import { useState, useEffect } from "react";
import { me as getMe } from "../services/authService";

export default function useAuth(){
  const [me, setMe] = useState(null);

  useEffect(() => {
    (async ()=>{
      try {
        const r = await getMe(); 
        setMe(r?.user || r);
      } catch(e) {
        setMe(null);
      }
    })();
  }, []);

  const canCreateUsers = me?.permissao === "ADMINISTRADOR";
  const canCreatePecas = me?.permissao === "ADMINISTRADOR" || me?.permissao === "ENGENHEIRO";
  const canDelete = me?.permissao === "ADMINISTRADOR";

  return { me, setMe, canCreateUsers, canCreatePecas, canDelete };
}
