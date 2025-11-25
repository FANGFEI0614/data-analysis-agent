import { load } from "jsr:@std/dotenv";
import Anthropic from "npm:@anthropic-ai/sdk@0.32.1";

// Load environment variables
await load({ export: true });

const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
if (!apiKey) {
  throw new Error("ANTHROPIC_API_KEY is required");
}

const client = new Anthropic({ apiKey });

// Read CSV file
async function readCSV(filePath: string): Promise<string> {
  const data = await Deno.readTextFile(filePath);
  return data;
}

// Analyze data
async function analyzeData(csvData: string, query: string) {
  console.log("🔍 Analyzing data...\n");

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `You are a data analyst. Here is a CSV dataset:

${csvData}

${query}

Please provide:
1. Key insights and patterns
2. Statistical summary
3. Trends or anomalies
4. Actionable recommendations

Format your response clearly with headers and bullet points.`,
      },
    ],
  });

  return message.content[0].text;
}

// Main function
async function main() {
  const csvFile = Deno.args[0] || "sales_data.csv";
  const query = Deno.args[1] || "Analyze this sales data and provide insights.";

  console.log(`📊 Data Analysis Agent`);
  console.log(`${"=".repeat(50)}\n`);
  console.log(`📁 File: ${csvFile}`);
  console.log(`❓ Query: ${query}\n`);

  try {
    // Read CSV
    const csvData = await readCSV(csvFile);
    console.log(`✅ Loaded ${csvData.split("\n").length - 1} rows\n`);

    // Analyze
    const analysis = await analyzeData(csvData, query);

    console.log("📈 Analysis Results:");
    console.log("=".repeat(50));
    console.log(analysis);
    console.log("\n" + "=".repeat(50));
    console.log("✅ Analysis complete!");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

main();