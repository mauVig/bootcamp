import Recipes from "./Recipes";
import { useGlobalContext } from "../../context/GlobalContext";

export default function ContRecipes({ data }) {
  const { userData } = useGlobalContext()

  return (
    <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-11">
      {data.map((recipe) => (
        <Recipes key={recipe._id} {...recipe} email={userData.email} />
      ))}
    </div>
  )
}
