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
  console.log("🌱 Starting database seeding with UUID support...");

  try {
    // Create test users - UUIDs generated automatically
    console.log("Creating test users...");

    const [testUser1, testUser2] = await db
      .insert(users)
      .values([
        {
          email: "demo@taskflow.com",
          name: "Demo User",
          passwordHash: "", // Better Auth handles this
          emailVerified: true,
        },
        {
          email: "qa@taskflow.com",
          name: "QA Engineer",
          passwordHash: "", // Better Auth handles this
          emailVerified: true,
        },
      ])
      .returning();

    console.log("✅ Test users created with UUIDs:");
    console.log(`   - ${testUser1.name}: ${testUser1.id}`);
    console.log(`   - ${testUser2.name}: ${testUser2.id}`);

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

    console.log("✅ Sample projects created with UUIDs:");
    console.log(`   - ${project1.name}: ${project1.id}`);
    console.log(`   - ${project2.name}: ${project2.id}`);

    // Create sample tasks
    console.log("Creating sample tasks...");
    const newTasks = await db
      .insert(tasks)
      .values([
        {
          title: "Setup Authentication System",
          description:
            "Implement user registration and login functionality using Better Auth",
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
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
        {
          title: "Write Cypress E2E Tests",
          description:
            "Create comprehensive end-to-end tests for all user journeys",
          status: "todo",
          priority: "medium",
          projectId: project2.id,
          userId: testUser1.id,
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
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
      ])
      .returning();

    console.log(`✅ ${newTasks.length} sample tasks created with UUIDs`);
    console.log("🎉 Database seeding completed successfully!");

    console.log("\n🔑 Authentication Testing:");
    console.log("1. Visit: http://localhost:4000/signup");
    console.log("2. Create account with any email/password");
    console.log("3. Better Auth will handle all authentication records");
    console.log("\n💡 Demo accounts available for signup:");
    console.log("   - demo@taskflow.com");
    console.log("   - qa@taskflow.com");
    console.log("   - Use any password (8+ characters)");
    console.log("\n🎯 All tables now use UUIDs - Better Auth compatible!");
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
