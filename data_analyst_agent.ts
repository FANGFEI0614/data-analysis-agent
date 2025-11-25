import { load } from "jsr:@std/dotenv";
import {
  AnthropicModelProvider,
  createZypherContext,
  ZypherAgent,
} from "@corespeed/zypher";
import { eachValueFrom } from "rxjs-for-await";

await load({ export: true });

function getRequiredEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value;
}

const context = await createZypherContext(Deno.cwd());
const provider = new AnthropicModelProvider({
  apiKey: getRequiredEnv("ANTHROPIC_API_KEY"),
});

const agent = new ZypherAgent(context, provider, {
  systemPrompt:
    "You are a data analysis agent. You receive CSV data and a user question and return clear analytical insights.",
});

const csvFile = Deno.args[0] ?? "sales_data.csv";
const query =
  Deno.args[1] ??
  "Analyze this sales data and provide key insights, statistics, trends, and recommendations.";

const csvData = await Deno.readTextFile(csvFile);

const taskDescription = `
You are a senior data analyst. Here is a CSV dataset:

${csvData}

User question: ${query}

Please provide:
1. Key insights and patterns
2. Basic statistical summary (means/totals where relevant)
3. Notable trends or anomalies
4. Concrete, actionable recommendations

Format your answer with clear headings and bullet points.
`;

console.log("Data Analysis Agent (Zypher)\n");
console.log(`File: ${csvFile}`);
console.log(`Query: ${query}\n`);
console.log("Running task via ZypherAgent...\n");

const event$ = agent.runTask(
  taskDescription,
  "claude-sonnet-4-20250514",
);

for await (const event of eachValueFrom(event$ as any)) {
  console.log(event);
}

console.log("\nAnalysis complete!");
