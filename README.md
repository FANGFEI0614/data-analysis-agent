# Data Analysis Agent

AI-powered data analysis agent built with Zypher framework and Claude API for the CoreSpeed technical assessment.

## Features

- Automated CSV data analysis
- Powered by Claude Sonnet 4.5
- Generates insights, trends, and recommendations
- Statistical summaries and pattern detection

## Prerequisites

- [Deno](https://deno.land/) installed
- Anthropic API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/FANGFEI0614/data-analysis-agent.git
cd data-analysis-agent
```

2. Create a `.env` file with your API key:
```
ANTHROPIC_API_KEY=your_api_key_here
```

## Usage

To run the Data Analysis Agent, use the following command inside the project directory:
```bash
deno run --allow-env --allow-net --allow-read data_analyst_agent.ts
```

You can also specify a custom CSV file and analysis question:
```bash
deno run --allow-env --allow-env --allow-net --allow-read data_analyst_agent.ts <csv_file> "<your_question>"
```

Example:
```bash
deno run --allow-env --allow-net --allow-read data_analyst_agent.ts sales_data.csv "What trends can you find and what actions should we take?"
```
## Technical Stack

- Runtime: Deno
- Agent framework: Zypher (`@corespeed/zypher`)
- LLM: Claude Sonnet 4.5 (Anthropic)
- Interface: CLI using `ZypherAgent.runTask` and streaming task events

## Example Output

The agent provides:
- Key insights and patterns from the data
- Statistical summaries
- Trend analysis
- Actionable recommendations

## Project Structure
```
data-analysis-agent/
├── data_analyst_agent.ts    # Main agent code
├── sales_data.csv            # Sample dataset
├── .env                      # API keys (not in repo)
└── README.md                 # This file
```

## Technical Stack

- **Runtime**: Deno
- **AI Model**: Claude Sonnet 4.5 (Anthropic)
- **Framework**: Direct Anthropic SDK integration

## Demo

[Link to demo video will be added]

## License

MIT
