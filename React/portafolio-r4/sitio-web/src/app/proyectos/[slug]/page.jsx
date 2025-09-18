// [slug]/page.jsx
import ProjectDetail from "./ProjectDetail";

export default function Page({ params }) {
  return <ProjectDetail slug={params.slug} />;
}
