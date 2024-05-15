import ContRecipes from "./ContRecipes";
import NoRecipes from "./NoRecipes";

export default function ContAllDataToWall({ data, look }) {
  return (
    <>
      {look ? (
        <ContRecipes data={data} />
      ) : (
        <NoRecipes />
      )}
    </>
  )
}
