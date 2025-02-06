import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCycleSchema } from "@shared/schema";
import { ZodError } from "zod";

export function registerRoutes(app: Express): Server {
  app.post("/api/cycles", async (req, res) => {
    try {
      const cycleData = insertCycleSchema.parse(req.body);
      const cycle = await storage.createCycle(cycleData);
      res.json(cycle);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid cycle data" });
      } else {
        res.status(500).json({ message: "Failed to create cycle" });
      }
    }
  });

  app.get("/api/cycles/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const cycle = await storage.getCycle(id);
    if (!cycle) {
      res.status(404).json({ message: "Cycle not found" });
      return;
    }
    res.json(cycle);
  });

  app.patch("/api/cycles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const cycleData = insertCycleSchema.parse(req.body);
      const cycle = await storage.updateCycle(id, cycleData);
      res.json(cycle);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid cycle data" });
      } else {
        res.status(500).json({ message: "Failed to update cycle" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
