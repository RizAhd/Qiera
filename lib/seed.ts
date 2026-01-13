import { ID } from "react-native-appwrite";
import { config, databases } from "./appwrite";
import {
    agentImages,
    galleryImages,
    propertiesImages,
    reviewImages,
} from "./data";

/**
 * Appwrite Tables (formerly Collections)
 */
const TABLES = {
  AGENT: config.agentsTableId,
  REVIEWS: config.reviewsTableId,
  GALLERY: config.galleriesTableId,
  PROPERTY: config.propertiesTableId,
};

/**
 * Static Data
 */
const propertyTypes = [
  "House",
  "Townhouse",
  "Condo",
  "Duplex",
  "Studio",
  "Villa",
  "Apartment",
  "Other",
];

const facilities = [
  "Laundry",
  "Parking",
  "Gym",
  "Wifi",
  "PetCenter",
];

/**
 * Utility: Random Subset Generator
 */
function getRandomSubset<T>(
  array: T[],
  min: number,
  max: number
): T[] {
  const size = Math.floor(Math.random() * (max - min + 1)) + min;
  return [...array].sort(() => 0.5 - Math.random()).slice(0, size);
}

/**
 * Seed Database
 */
async function seed() {
  try {
    /* ---------------- CLEAR EXISTING DATA ---------------- */
    for (const key in TABLES) {
      const tableId = TABLES[key as keyof typeof TABLES];
      const docs = await databases.listDocuments(
        config.databaseId!,
        tableId!
      );

      for (const doc of docs.documents) {
        await databases.deleteDocument(
          config.databaseId!,
          tableId!,
          doc.$id
        );
      }
    }

    console.log("✅ All tables cleared");

    /* ---------------- SEED AGENTS ---------------- */
    const agents = [];

    for (let i = 1; i <= 5; i++) {
      const agent = await databases.createDocument(
        config.databaseId!,
        TABLES.AGENT!,
        ID.unique(),
        {
          name: `Agent ${i}`,
          email: `agent${i}@example.com`,
          avatar: agentImages[Math.floor(Math.random() * agentImages.length)],
        }
      );
      agents.push(agent);
    }

    console.log(`✅ Seeded ${agents.length} agents`);

    /* ---------------- SEED REVIEWS ---------------- */
    const reviews = [];

    for (let i = 1; i <= 20; i++) {
      const review = await databases.createDocument(
        config.databaseId!,
        TABLES.REVIEWS!,
        ID.unique(),
        {
          name: `Reviewer ${i}`,
          avatar: reviewImages[Math.floor(Math.random() * reviewImages.length)],
          review: `This is a review by Reviewer ${i}`,
          rating: Math.floor(Math.random() * 5) + 1,
        }
      );
      reviews.push(review);
    }

    console.log(`✅ Seeded ${reviews.length} reviews`);

    /* ---------------- SEED GALLERY ---------------- */
    const galleries = [];

    for (const image of galleryImages) {
      const gallery = await databases.createDocument(
        config.databaseId!,
        TABLES.GALLERY!,
        ID.unique(),
        { image }
      );
      galleries.push(gallery);
    }

    console.log(`✅ Seeded ${galleries.length} gallery images`);

    /* ---------------- SEED PROPERTIES ---------------- */
    for (let i = 1; i <= 20; i++) {
      const agent = agents[Math.floor(Math.random() * agents.length)];
      const selectedReviews = getRandomSubset(reviews, 3, 7);
      const selectedGalleries = getRandomSubset(galleries, 3, 8);

      const image =
        propertiesImages[i] ??
        propertiesImages[Math.floor(Math.random() * propertiesImages.length)];

      const property = await databases.createDocument(
        config.databaseId!,
        TABLES.PROPERTY!,
        ID.unique(),
        {
          name: `Property ${i}`,
          type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
          description: `Description for Property ${i}`,
          address: `123 Property Street, City ${i}`,
          geolocation: `6.9271,79.8612`,
          price: Math.floor(Math.random() * 9000) + 1000,
          area: Math.floor(Math.random() * 3000) + 500,
          bedrooms: Math.floor(Math.random() * 5) + 1,
          bathrooms: Math.floor(Math.random() * 5) + 1,
          rating: Math.floor(Math.random() * 5) + 1,
          facilities: getRandomSubset(facilities, 1, facilities.length),
          image,
          agent: agent.$id,
          reviews: selectedReviews.map(r => r.$id),
          gallery: selectedGalleries.map(g => g.$id),
        }
      );

      console.log(`🏠 Seeded property: ${property.name}`);
    }

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding error:", error);
  }
}

export default seed;
