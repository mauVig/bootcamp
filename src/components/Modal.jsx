import { Button } from "@tremor/react";
import { BORDER_BLACK } from "../constant/myConstant";
import { back, deleteIco } from "./icons";

export default function Modal({ show, setShow, name,action }) {
  const handlerClear = () => {
    action()
    setShow(false)
  }
  
  return (
    <>
      {show && (
        <div className="absolute top-0 left-0 z-30 h-screen w-screen bg-slate-500 bg-opacity-30 flex items-center justify-center">
          <div className={`absolute z-50  opacity-100 ${BORDER_BLACK} px-8 py-4 max-w-[400px]`}>
            <h2 className="text-2xl p-6">Deseas borrar <span className="font-semibold">{name}</span> ?</h2>
            <div className="flex justify-between items-center">
              <Button
                variant="secondary"
                icon={back}
                onClick={() => setShow(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                icon={deleteIco}
                onClick={handlerClear}
              >
                Borrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
