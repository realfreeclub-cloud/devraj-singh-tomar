import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = body.id ?? null;
    const method = body.method;

    if (method === "initialize") {
      return Response.json({
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          serverInfo: {
            name: "devraj-singh-tomar-mcp",
            version: "1.0.0",
          },
          capabilities: {
            tools: {},
            resources: {},
          },
        },
      });
    }

    if (method === "tools/list") {
      return Response.json({
        jsonrpc: "2.0",
        id,
        result: {
          tools: [
            {
              name: "get_portfolio_info",
              description: "Get comprehensive professional background and live projects delivered by Devraj Singh Tomar.",
              inputSchema: {
                type: "object",
                properties: {
                  category: {
                    type: "string",
                    description: "Category: overview, education, healthcare, legal, startups, ventures",
                  },
                },
              },
            },
            {
              name: "contact_devraj",
              description: "Submit project proposals or hire inquiry directly to Devraj Singh Tomar.",
              inputSchema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  message: { type: "string" },
                },
                required: ["name", "email", "message"],
              },
            },
          ],
        },
      });
    }

    if (method === "tools/call") {
      const toolName = body.params?.name;
      if (toolName === "get_portfolio_info") {
        return Response.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  name: "Devraj Singh Tomar",
                  title: "IT Project Manager & Next.js Developer India",
                  email: "hello@devrajsinghtomar.com",
                  phone: "+91 9140946121",
                  ventures: ["Tecxontechnology", "M/S Career Avsar", "Lotus Loop Media Solution"],
                  projectsDelivered: "60+",
                  verifiedClients: "45+",
                  location: "Noida, Uttar Pradesh, India",
                }),
              },
            ],
          },
        });
      }

      if (toolName === "contact_devraj") {
        const { name, email } = body.params?.arguments || {};
        return Response.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: `Inquiry successfully registered for ${name || "Client"}. Devraj will respond at ${email || "provided contact"}.`,
              },
            ],
          },
        });
      }
    }

    return Response.json({
      jsonrpc: "2.0",
      id,
      result: {},
    });
  } catch {
    return Response.json({
      jsonrpc: "2.0",
      id: null,
      error: { code: -32700, message: "Parse error" },
    });
  }
}

export async function GET() {
  return Response.json({
    name: "Devraj Singh Tomar Portfolio MCP Server",
    version: "1.0.0",
    status: "active",
    endpoint: "https://devrajsinghtomar.com/api/mcp",
  });
}
