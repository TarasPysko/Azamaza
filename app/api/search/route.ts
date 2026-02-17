import { NextRequest, NextResponse } from "next/server";

export interface SearchRequest {
  destination: string;
  serviceType: string;
  date: string;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  rating: number;
  image?: string;
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    title: "Premium Hotel Suite",
    description: "Luxury accommodation in the heart of the city",
    location: "Kyiv, Ukraine",
    price: "$150/night",
    rating: 4.8,
  },
  {
    id: "2",
    title: "Business Meeting Room",
    description: "Professional space for corporate meetings",
    location: "Lviv, Ukraine",
    price: "$50/hour",
    rating: 4.5,
  },
  {
    id: "3",
    title: "Restaurant Reservation",
    description: "Fine dining experience with local cuisine",
    location: "Odesa, Ukraine",
    price: "$80/person",
    rating: 4.9,
  },
];

export async function POST(request: NextRequest) {
  try {
    const body: SearchRequest = await request.json();

    if (!body.destination || body.destination.trim() === "") {
      return NextResponse.json(
        { error: "Destination is required" },
        { status: 400 }
      );
    }

    if (!body.serviceType || body.serviceType.trim() === "") {
      return NextResponse.json(
        { error: "Service type is required" },
        { status: 400 }
      );
    }

    if (!body.date || body.date.trim() === "") {
      return NextResponse.json(
        { error: "Date is required" },
        { status: 400 }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({
      success: true,
      results: mockResults,
      query: body,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
