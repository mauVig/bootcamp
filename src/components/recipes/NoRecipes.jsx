import { Button } from "@tremor/react";
import { plus } from "../icons";
import { useNavigate } from "react-router-dom";
import { BORDER_BLACK } from "../../constant/myConstant";

export default function NoRecipes() {
  const go = useNavigate()
  
  return (
    <div className={`w-full h-[400px] bg-gray-50 flex justify-center items-center z-20 ${BORDER_BLACK}`}>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl">Todavia no tienes recetas creadas </h2>
        <div className="flex justify-center mt-8">
          <Button
            variant="primary"
            icon={plus}
            onClick={() => go('/wall/crear')}
          >
            Crear recetas
          </Button>

        </div>
      </div>
    </div>
  )
}
