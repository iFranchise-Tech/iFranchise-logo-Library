import { IconStudio } from "@/components/IconStudio";
export default async function IconPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <IconStudio initialSlug={slug} />; }
