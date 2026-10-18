import { CategoryPageView } from "./CategoryPageView";

export function generateStaticParams() {
  return [{ slug: "flours" }, { slug: "teas" }];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <CategoryPageView slug={slug} />;
}
