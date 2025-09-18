import EditProject from "./EditProject";

export default async function Page({ params }) {
  const { slug } = await params; // en Next 15 params es una Promise
  return <EditProject slug={slug} />;
}
