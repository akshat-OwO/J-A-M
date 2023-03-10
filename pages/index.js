import { createClient } from "contentful"
import RecipeCard from "../components/RecipeCard";

export async function getStaticProps() {

  const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN
  });

  const res = await client.getEntries({ content_type: 'recipe' });

  return {
    props: {
      recipes: res.items
    },
    revalidate: 1
  }
}

export default function Recipes({ recipes }) {
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}
      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px 60px;
        }
      `}</style>
    </div>
  )
}