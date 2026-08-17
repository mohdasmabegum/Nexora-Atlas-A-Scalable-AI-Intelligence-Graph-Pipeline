"""
Nexora Atlas / IntelliMesh - Production Fixtures Generator
Generates realistic sample datasets for Startups, Products, Research Papers (with GitHub metrics),
24-hr fresh Jobs, 24-hr fresh News, and Entity Mapping Logs.
"""

import json
import os
import random
from datetime import datetime, timedelta, timezone

AI_STARTUPS_SEED = [
    ("OpenAI", ["ChatGPT", "Sora", "DALL-E 3", "Whisper", "GPT-4o", "OpenAI API"], 1500, "https://openai.com"),
    ("Anthropic", ["Claude 3.5 Sonnet", "Claude 3 Opus", "Claude Enterprise", "Constitutional AI"], 850, "https://anthropic.com"),
    ("Cohere", ["Command R+", "Embed v3", "Rerank", "Cohere Toolkit"], 450, "https://cohere.com"),
    ("Mistral AI", ["Mistral Large 2", "Codestral", "Pixtral", "Le Chat", "Mistral NeMo"], 200, "https://mistral.ai"),
    ("Stability AI", ["Stable Diffusion 3", "Stable Audio 2", "Stable Video Diffusion", "Stable LM"], 180, "https://stability.ai"),
    ("Hugging Face", ["Hugging Face Hub", "Transformers", "Diffusers", "Datasets", "AutoTrain"], 350, "https://huggingface.co"),
    ("Midjourney", ["Midjourney v6", "Niji Journey", "Midjourney Web Editor"], 90, "https://midjourney.com"),
    ("Runway", ["Gen-3 Alpha", "Gen-2", "Motion Brush", "Frame Interpolation"], 220, "https://runwayml.com"),
    ("Scale AI", ["Scale Data Engine", "Scale Donovan", "Scale GenAI Platform"], 1200, "https://scale.com"),
    ("Perplexity AI", ["Perplexity Pro", "Perplexity Enterprise Pro", "Sonar API"], 140, "https://perplexity.ai"),
    ("Glean", ["Glean Search", "Glean Assistant", "Glean Knowledge Model"], 320, "https://glean.com"),
    ("Adept AI", ["ACT-1 Agent", "Adept Workstation"], 110, "https://adept.ai"),
    ("Character.ai", ["Character c.ai", "Voice Characters", "Group Chats"], 160, "https://character.ai"),
    ("Together AI", ["Together Inference Engine", "Together Fine-Tuning", "Together GPU Cluster"], 150, "https://together.ai"),
    ("Anyscale", ["Anyscale Ray Platform", "Anyscale Endpoints"], 280, "https://anyscale.com"),
    ("Inflection AI", ["Pi 2.0 Assistant", "Inflection Engine"], 100, "https://inflection.ai"),
    ("Pinecone", ["Pinecone Serverless", "Vector Database Engine"], 210, "https://pinecone.io"),
    ("Weaviate", ["Weaviate Cloud", "Hybrid Search Engine"], 130, "https://weaviate.io"),
    ("Qdrant", ["Qdrant Managed Cloud", "Vector Search API"], 95, "https://qdrant.tech"),
    ("Chroma", ["Chroma DB Open Source", "Chroma Cloud"], 45, "https://trychroma.com"),
    ("LangChain", ["LangChain Core", "LangGraph", "LangSmith Platform"], 85, "https://langchain.com"),
    ("LlamaIndex", ["LlamaCloud", "LlamaParse PDF Reader", "LlamaIndex Engine"], 60, "https://llamaindex.ai"),
    ("Weights & Biases", ["W&B Models", "W&B Prompts", "W&B Weave"], 310, "https://wandb.ai"),
    ("Replicate", ["Replicate Cloud Inference", "Replicate Model Registry"], 75, "https://replicate.com"),
    ("EleutherAI", ["GPT-NeoX", "Pythia Suite", "LM Evaluation Harness"], 40, "https://eleuther.ai"),
    ("Groq", ["GroqLPU Inference Engine", "GroqCloud API"], 240, "https://groq.com"),
    ("SambaNova", ["SambaNova SN40L Chip", "Samba-1 Suite"], 500, "https://sambanova.ai"),
    ("Cerebras Systems", ["Cerebras CS-3", "Wafer-Scale Engine 3"], 420, "https://cerebras.ai"),
    ("Cognition AI", ["Devin AI Software Engineer", "Devin Enterprise"], 55, "https://cognition-labs.com"),
    ("Harvey AI", ["Harvey Legal AI", "Harvey Vault"], 180, "https://harvey.ai"),
    ("Synthesia", ["Synthesia Video Studio", "AI Avatars v4"], 340, "https://synthesia.io"),
    ("ElevenLabs", ["ElevenLabs Voice Library", "Dubbing Studio", "Conversational AI"], 190, "https://elevenlabs.io")
]

PAPERS_SEED = [
    ("Scalable Autoregressive Visual Generation with Vector Quantization", ["Shang Guan", "Yue Wu", "Wei Lin"], "cs.CV"),
    ("Direct Preference Optimization: Your Language Model is Secretly a Reward Model", ["Rafael Rafailov", "Archit Sharma", "Eric Mitchell"], "cs.LG"),
    ("FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning", ["Tri Dao"], "cs.LG"),
    ("Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", ["Patrick Lewis", "Ethan Perez", "Aleksandra Piktus"], "cs.CL"),
    ("LoRA: Low-Rank Adaptation of Large Language Models", ["Edward J. Hu", "Yelong Shen", "Phillip Wallis"], "cs.CL"),
    ("DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning", ["DeepSeek-AI Team"], "cs.AI"),
    ("Llama 3 Herd of Models: Architecture, Training, and Alignment", ["Meta AI Research Team"], "cs.CL"),
    ("QLoRA: Efficient Finetuning of Quantized LLMs", ["Tim Dettmers", "Artidoro Pagnoni", "Ari Holtzman"], "cs.LG"),
    ("Tree of Thoughts: Deliberate Problem Solving with Large Language Models", ["Shunyu Yao", "Dian Yu", "Jeffrey Zhao"], "cs.AI"),
    ("Speculative Decoding: Fast LLM Inference via Target Model Alignment", ["Yaniv Leviathan", "Matan Kalman", "Yossi Matias"], "cs.CL"),
    ("Toolformer: Language Models Can Teach Themselves to Use Tools", ["Timo Schick", "Jane Dwivedi-Yu", "Roberto Dessì"], "cs.CL"),
    ("Self-Instruct: Aligning Language Models with Self-Generated Instructions", ["Yizhong Wang", "Yeganeh Kordi", "Swaroop Mishra"], "cs.CL"),
    ("Constitutional AI: Harmlessness from AI Feedback", ["Yuntao Bai", "Saurav Kadavath", "Sandeep Kundu"], "cs.CL")
]

JOB_TITLES = [
    "Senior AI Infrastructure Engineer", "Staff LLM Alignment Researcher", "Distributed Systems Engineer (GPU Cluster)",
    "Senior Inference Optimization Engineer", "Lead Data Pipelines Architect", "Generative AI Solutions Architect",
    "Research Scientist - Computer Vision", "Quantization & CUDA Engineer", "AI Safety & Governance Lead",
    "Senior Synthetic Data Engineer", "Machine Learning Compiler Engineer", "Foundational Model Trainer"
]

NEWS_HEADLINES = [
    ("Unveils Next-Generation Reasoning Architecture with Breakthrough Benchmark Scores", "TechCrunch"),
    ("Announces $2 Billion Investment in Custom Silicon Infrastructure", "VentureBeat"),
    ("Releases Open-Source Weights for 70B Parameter Foundational Model", "Hacker News"),
    ("Achieves SOTA Efficiency in Real-Time Voice Synthesis and Translation", "Ars Technica"),
    ("Partners with Fortune 500 Enterprises to Deploy Agentic Workflows", "Forbes AI"),
    ("Publishes Breakthrough Paper on Zero-Shot Multi-Modal Alignment", "MIT Technology Review"),
    ("Expands Global GPU Data Centers with Direct Liquid Cooling Tech", "Data Center Dynamics"),
    ("Launches Enterprise AI Agent Evaluation Framework for Developers", "SiliconANGLE")
]


def generate_fixtures():
    os.makedirs("fixtures", exist_ok=True)
    now_utc = datetime.now(timezone.utc)

    # 1. Startups (1,000)
    startups = []
    for i in range(1, 1001):
        seed_name, _, emp_base, url = AI_STARTUPS_SEED[(i - 1) % len(AI_STARTUPS_SEED)]
        emp_count = emp_base + random.randint(-15, 120)
        name = seed_name if i <= len(AI_STARTUPS_SEED) else f"{seed_name} Division #{i}"
        startups.append({
            "id": f"s-{i}",
            "schemaVersion": "1.0",
            "recordType": "STARTUP",
            "source": {"name": "FrontierAtlas Directory Scraper", "url": f"{url}/about"},
            "content": {"entityName": name, "data": {"employeeCount": max(10, emp_count)}},
            "collectedAt": (now_utc - timedelta(minutes=random.randint(5, 1440))).isoformat()
        })

    # 2. Products (1,000)
    products = []
    pricing_models = ["FREE", "FREEMIUM", "PAID", "ENTERPRISE"]
    for i in range(1, 1001):
        seed_company, prods, _, url = AI_STARTUPS_SEED[(i - 1) % len(AI_STARTUPS_SEED)]
        prod_name = prods[(i - 1) % len(prods)]
        if i > len(AI_STARTUPS_SEED) * len(prods):
            prod_name = f"{prod_name} v{i // 30 + 1}.0"
        products.append({
            "id": f"p-{i}",
            "schemaVersion": "1.0",
            "recordType": "PRODUCT",
            "source": {"name": "ProductHunt AI Index", "url": f"{url}/product/{i}"},
            "content": {
                "productName": prod_name,
                "startupName": seed_company,
                "pricingModel": pricing_models[i % len(pricing_models)]
            },
            "collectedAt": (now_utc - timedelta(minutes=random.randint(5, 1440))).isoformat()
        })

    # 3. Research Papers (1,000)
    papers = []
    for i in range(1, 1001):
        title_tmpl, authors, cat = PAPERS_SEED[(i - 1) % len(PAPERS_SEED)]
        paper_id = 98400 + i
        paper_url = f"https://paperswithcode.co/paper/{paper_id}"
        gh_url = f"https://github.com/ai-research/{title_tmpl.split()[0].lower()}-official" if i % 4 != 0 else None
        gh_stars = random.randint(350, 52000) if gh_url else None
        pub_days = random.randint(1, 180)
        pub_date = (now_utc - timedelta(days=pub_days)).isoformat()
        papers.append({
            "id": f"r-{i}",
            "schemaVersion": "1.0",
            "recordType": "RESEARCH_PAPER",
            "content": {
                "title": f"{title_tmpl} [v{i}]" if i > len(PAPERS_SEED) else title_tmpl,
                "authors": authors,
                "paper_url": paper_url,
                "github_url": gh_url,
                "github_stars": gh_stars,
                "published_date": pub_date
            },
            "collectedAt": now_utc.isoformat()
        })

    # 4. 24-hr Fresh Jobs (150)
    jobs = []
    role_families = ["Engineering", "Research", "Product", "Data", "Design"]
    for i in range(1, 151):
        company, _, _, url = AI_STARTUPS_SEED[i % len(AI_STARTUPS_SEED)]
        hours_ago = random.randint(1, 23)
        job_date = (now_utc - timedelta(hours=hours_ago)).isoformat()
        jobs.append({
            "id": f"j-{i}",
            "schemaVersion": "1.0",
            "recordType": "JOB",
            "content": {
                "company": company,
                "title": JOB_TITLES[i % len(JOB_TITLES)],
                "date": job_date,
                "is_remote": (i % 3 != 0),
                "role_family": role_families[i % len(role_families)],
                "source_url": f"{url}/careers/{i}"
            },
            "freshnessStatus": "VALIDATED_FRESH_24H",
            "collectedAt": now_utc.isoformat()
        })

    # 5. 24-hr Fresh News (120)
    news = []
    for i in range(1, 121):
        company, _, _, url = AI_STARTUPS_SEED[i % len(AI_STARTUPS_SEED)]
        headline_tmpl, news_src = NEWS_HEADLINES[i % len(NEWS_HEADLINES)]
        hours_ago = random.randint(0, 22)
        pub_date = (now_utc - timedelta(hours=hours_ago, minutes=random.randint(0, 59))).isoformat()
        news.append({
            "id": f"n-{i}",
            "schemaVersion": "1.0",
            "recordType": "NEWS",
            "source": {"name": news_src, "url": f"https://{news_src.lower().replace(' ', '')}.com/article/{i}"},
            "content": {
                "title": f"{company} {headline_tmpl}",
                "url": f"https://{news_src.lower().replace(' ', '')}.com/article/{i}",
                "full_text": f"Full article coverage on {company}'s strategic AI deployment and breakthrough architectures.",
                "published_date": pub_date,
                "canonical_source": news_src
            },
            "freshnessStatus": "VALIDATED_FRESH_24H",
            "collectedAt": now_utc.isoformat()
        })

    # 6. Entity Mappings (60)
    mappings = []
    raw_samples = ["Open AI", "OpenAI, Inc.", "Anthropic PBC", "Mistral AI Ltd", "Cohere AI Inc", "Hugging Face Corp"]
    for i, raw in enumerate(raw_samples * 10, start=1):
        clean = raw.replace(", Inc.", "").replace(" PBC", "").replace(" Ltd", "").replace(" Inc", "").replace(" Corp", "")
        if clean == "Open AI":
            canonical = "OpenAI"
        elif clean == "Cohere AI":
            canonical = "Cohere"
        else:
            canonical = clean
        mappings.append({
            "id": f"m-{i}",
            "rawName": raw,
            "canonicalName": canonical,
            "entityType": "STARTUP",
            "matchingMethod": "Deterministic Exact/Fuzzy",
            "confidenceScore": 0.98 if raw != "Open AI" else 1.0,
            "source": "Seed Lookup & Levenshtein",
            "timestamp": now_utc.isoformat()
        })

    with open("fixtures/startups.json", "w") as f: json.dump(startups, f, indent=2)
    with open("fixtures/products.json", "w") as f: json.dump(products, f, indent=2)
    with open("fixtures/research_papers.json", "w") as f: json.dump(papers, f, indent=2)
    with open("fixtures/jobs.json", "w") as f: json.dump(jobs, f, indent=2)
    with open("fixtures/news.json", "w") as f: json.dump(news, f, indent=2)
    with open("fixtures/entity_mappings.json", "w") as f: json.dump(mappings, f, indent=2)

    print("[Fixtures] Production sample datasets generated cleanly in /fixtures.")

if __name__ == "__main__":
    generate_fixtures()
