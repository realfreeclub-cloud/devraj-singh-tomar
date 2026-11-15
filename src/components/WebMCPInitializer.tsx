"use client";

import { useEffect } from "react";

interface WebMCPTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<Record<string, unknown>>;
}

interface WebMCPContext {
  tools: Map<string, WebMCPTool>;
  registerTool: (tool: WebMCPTool) => void;
}

interface NavigatorWithMCP extends Navigator {
  modelContext?: WebMCPContext;
}

export default function WebMCPInitializer() {
  useEffect(() => {
    if (typeof window === "undefined" || !("navigator" in window)) return;

    try {
      const nav = window.navigator as NavigatorWithMCP;
      if (!nav.modelContext) {
        nav.modelContext = {
          tools: new Map(),
          registerTool(tool: WebMCPTool) {
            this.tools.set(tool.name, tool);
          },
        };
      }

      if (typeof nav.modelContext?.registerTool === "function") {
        nav.modelContext.registerTool({
          name: "get_portfolio_summary",
          description: "Get verified professional portfolio details, live projects, and technical skills of Devraj Singh Tomar",
          inputSchema: {
            type: "object",
            properties: {
              category: {
                type: "string",
                description: "Category of interest: overview, projects, contact, ventures",
              },
            },
          },
          execute: async () => ({
            name: "Devraj Singh Tomar",
            role: "IT Project Manager & Next.js Developer India",
            email: "hello@devrajsinghtomar.com",
            phone: "+91 9140946121",
            location: "chokhani square, 309, Sector 18, Noida, Uttar Pradesh 201301",
            projectsCount: 60,
            activeVentures: ["Tecxontechnology", "M/S Career Avsar", "Lotus Loop Media Solution"],
            website: "https://devrajsinghtomar.com",
          }),
        });

        nav.modelContext.registerTool({
          name: "contact_devraj",
          description: "Send an inquiry or project proposal to Devraj Singh Tomar",
          inputSchema: {
            type: "object",
            properties: {
              name: { type: "string", description: "Name of the sender or client" },
              email: { type: "string", description: "Email address for response" },
              message: { type: "string", description: "Project description or inquiry details" },
            },
            required: ["name", "email", "message"],
          },
          execute: async (input: Record<string, unknown>) => ({
            success: true,
            status: "queued",
            message: `Thank you ${String(input.name || "Client")}. Your inquiry has been noted. Devraj will reply to ${String(input.email || "your contact")}.`,
          }),
        });
      }
    } catch {
      // Graceful degradation
    }
  }, []);

  return null;
}
