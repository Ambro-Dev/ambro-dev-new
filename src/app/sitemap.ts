// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { serviceCategories } from "@/data/services";
import { baseURL } from "@/app/resources";

// Dodatkowe typy dla elementów sitemap
type SitemapFrequency =
	| "always"
	| "hourly"
	| "daily"
	| "weekly"
	| "monthly"
	| "yearly"
	| "never";

interface SitemapEntry {
	url: string;
	lastModified: string | Date;
	changeFrequency: SitemapFrequency;
	priority: number;
}

// Pomocnicza funkcja formatująca datę dla sitemap
function formatDate(date: Date): string {
	return date.toISOString();
}

// Funkcja do dynamicznego generowania sitemap.xml
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const currentDate = formatDate(new Date());

	// Podstawowe strony
	const staticPages: SitemapEntry[] = [
		{
			url: `https://${baseURL}`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 1.0,
		},
		{
			url: `https://${baseURL}/uslugi`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `https://${baseURL}/o-mnie`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `https://${baseURL}/projekty`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `https://${baseURL}/kontakt`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.7,
		},
	];

	// Strony usług
	const servicePages: SitemapEntry[] = serviceCategories.map((service) => ({
		url: `https://${baseURL}/uslugi/${service.id}`,
		lastModified: currentDate,
		changeFrequency: "monthly",
		priority: 0.7,
	}));

	// Tutaj możesz dodać dynamiczne pobieranie innych stron, np. blogowych
	// const blogPosts = await getBlogPosts();
	// const blogPages = blogPosts.map((post) => ({
	//   url: `https://${baseURL}/blog/${post.slug}`,
	//   lastModified: new Date(post.updatedAt || post.createdAt),
	//   changeFrequency: "monthly" as SitemapFrequency,
	//   priority: 0.6,
	// }));

	// Połącz wszystkie strony
	return [...staticPages, ...servicePages];
}
