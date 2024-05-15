import { Button } from "@tremor/react";
import { useNavigate } from "react-router-dom";
import { BORDER_BLACK } from "../../constant/myConstant";

export default function NoRecipesBuy() {
  const go = useNavigate()

  return (
    <div className={`w-full h-[400px] flex justify-center items-center z-20 ${BORDER_BLACK} `}>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl">Todavia no tienes Ingredientes  </h2>
        <div className="flex justify-center mt-8">
          <Button
            variant="primary"
            onClick={() => go('/wall')}
          >
            Ir a wall
          </Button>

        </div>
      </div>
    </div>
  )
}
