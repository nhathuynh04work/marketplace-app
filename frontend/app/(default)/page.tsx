import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const PRODUCTS = [
	{
		id: 1,
		name: "Wireless Headphones",
		price: "$199",
		image: "https://placehold.co/400x400/18181b/ffffff?text=Headphones",
	},
	{
		id: 2,
		name: "Mechanical Keyboard",
		price: "$120",
		image: "https://placehold.co/400x400/18181b/ffffff?text=Keyboard",
	},
	{
		id: 3,
		name: "Gaming Mouse",
		price: "$59",
		image: "https://placehold.co/400x400/18181b/ffffff?text=Mouse",
	},
	{
		id: 4,
		name: "4K Monitor",
		price: "$350",
		image: "https://placehold.co/400x400/18181b/ffffff?text=Monitor",
	},
	{
		id: 5,
		name: "Ergonomic Chair",
		price: "$299",
		image: "https://placehold.co/400x400/18181b/ffffff?text=Chair",
	},
	{
		id: 6,
		name: "USB-C Hub",
		price: "$45",
		image: "https://placehold.co/400x400/18181b/ffffff?text=Hub",
	},
];

export default function Home() {
	return (
		<div className="container mx-auto py-8 px-4">
			{/* Hero Section */}
			<section className="mb-12 rounded-2xl bg-linear-to-r from-primary/10 to-secondary/10 p-8 text-center md:text-left md:p-12">
				<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
					Welcome to Marketplace
				</h1>
				<p className="text-xl text-muted-foreground mb-8 max-w-2xl">
					Discover the best deals on electronics, fashion, and more.
					Start selling your own products today.
				</p>
				<Button size="lg" className="rounded-full">
					Explore Deals
				</Button>
			</section>

			{/* Product Grid */}
			<section>
				<h2 className="text-2xl font-bold tracking-tight mb-6">
					Featured Products
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{PRODUCTS.map((product) => (
						<Card
							key={product.id}
							className="overflow-hidden border-border/50 bg-secondary/20">
							<div className="aspect-square relative bg-secondary/50">
								<Image
									src={product.image}
									alt={product.name}
									fill
									className="object-cover transition-transform hover:scale-105"
								/>
							</div>
							<CardContent className="p-4">
								<h3 className="font-semibold truncate">
									{product.name}
								</h3>
								<p className="text-lg font-bold text-primary mt-1">
									{product.price}
								</p>
							</CardContent>
							<CardFooter className="p-4 pt-0">
								<Button className="w-full" variant="secondary">
									Add to Cart
								</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</section>
		</div>
	);
}
