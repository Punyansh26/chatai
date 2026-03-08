import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
// import { trpc } from "@/trpc/server";

export const agentRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        const data = await db.select().from(agents);
        await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate delay
        // throw new Error("Failed to fetch agents"); // Simulate error
        return data;
    }),
});
