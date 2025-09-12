import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { users, projects, tasks } from "./schema";
import * as schema from "./schema";

config({ path: ".env.local" });

const client = postgres(process.env.DATABASE_URL!, {
  prepare: false,
});

const db = drizzle(client, { schema });

async function seed() {
  console.log("🌱 Starting database seeding...");

  try {
    // Create test users
    console.log("Creating test users...");
    const hashedPassword = await bcrypt.hash("Test123!", 10);

    const [testUser1, testUser2] = await db
      .insert(users)
      .values([
        {
          email: "test@example.com",
          name: "Test User",
          passwordHash: hashedPassword,
          emailVerified: true,
        },
        {
          email: "qa@taskflow.com",
          name: "QA Engineer",
          passwordHash: hashedPassword,
          emailVerified: true,
        },
      ])
      .returning();

    console.log("✅ Test users created");

    // Create sample projects
    console.log("Creating sample projects...");
    const [project1, project2] = await db
      .insert(projects)
      .values([
        {
          name: "TaskFlow Development",
          description: "Main development project for TaskFlow Pro application",
          color: "#3b82f6",
          userId: testUser1.id,
        },
        {
          name: "QA Testing",
          description: "Quality assurance and testing project",
          color: "#10b981",
          userId: testUser1.id,
        },
      ])
      .returning();

    console.log("✅ Sample projects created");

    // Create sample tasks
    console.log("Creating sample tasks...");
    await db.insert(tasks).values([
      {
        title: "Setup Authentication System",
        description: "Implement user registration and login functionality",
        status: "done",
        priority: "high",
        projectId: project1.id,
        userId: testUser1.id,
        completed: true,
        completedAt: new Date(),
      },
      {
        title: "Create Task Management Interface",
        description: "Build the main task management UI with CRUD operations",
        status: "in_progress",
        priority: "high",
        projectId: project1.id,
        userId: testUser1.id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      },
      {
        title: "Write Cypress E2E Tests",
        description:
          "Create comprehensive end-to-end tests for all user journeys",
        status: "todo",
        priority: "medium",
        projectId: project2.id,
        userId: testUser1.id,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      },
      {
        title: "Setup CI/CD Pipeline",
        description:
          "Configure GitHub Actions for automated testing and deployment",
        status: "todo",
        priority: "medium",
        projectId: project1.id,
        userId: testUser1.id,
      },
      {
        title: "API Testing with Postman",
        description: "Create and execute API test collection",
        status: "todo",
        priority: "low",
        projectId: project2.id,
        userId: testUser1.id,
      },
    ]);

    console.log("✅ Sample tasks created");
    console.log("🎉 Database seeding completed successfully!");

    console.log("\n📝 Test Credentials:");
    console.log("Email: test@example.com");
    console.log("Password: Test123!");
    console.log("\nEmail: qa@taskflow.com");
    console.log("Password: Test123!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log("✅ Seeding process completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seeding process failed:", error);
    process.exit(1);
  });
