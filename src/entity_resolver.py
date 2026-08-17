"""
Nexora Atlas - Deterministic Entity Resolution Engine
Resolves messy, un-normalized raw entity names to canonical forms using exact seed lookup, token normalization, and string distance algorithms.
"""

import re
from typing import Dict, Tuple, List
from src.schemas import EntityMappingLog


class EntityResolver:
    """Canonicalization engine for AI Startups, Companies, and Products."""

    SEED_CANONICAL_ENTITIES = {
        "openai": "OpenAI",
        "anthropic": "Anthropic",
        "cohere": "Cohere",
        "mistral": "Mistral AI",
        "mistral ai": "Mistral AI",
        "stability": "Stability AI",
        "stability ai": "Stability AI",
        "huggingface": "Hugging Face",
        "hugging face": "Hugging Face",
        "midjourney": "Midjourney",
        "runway": "Runway",
        "runwayml": "Runway",
        "scale ai": "Scale AI",
        "scale": "Scale AI",
        "perplexity": "Perplexity AI",
        "perplexity ai": "Perplexity AI",
        "glean": "Glean",
        "adept": "Adept AI",
        "adept ai": "Adept AI",
        "character ai": "Character.ai",
        "character.ai": "Character.ai",
        "together ai": "Together AI",
        "together": "Together AI",
        "anyscale": "Anyscale",
        "deepmind": "Google DeepMind",
        "google deepmind": "Google DeepMind",
        "inflection": "Inflection AI",
        "inflection ai": "Inflection AI",
        "pinecone": "Pinecone",
        "weaviate": "Weaviate",
        "qdrant": "Qdrant",
        "chroma": "Chroma",
        "langchain": "LangChain",
        "llama index": "LlamaIndex",
        "llamaindex": "LlamaIndex",
        "weights & biases": "Weights & Biases",
        "wandb": "Weights & Biases",
        "replicate": "Replicate",
        "eleutherai": "EleutherAI",
        "eleuther ai": "EleutherAI",
        "databricks": "Databricks",
        "snowflake": "Snowflake",
        "groq": "Groq",
        "samba nova": "SambaNova",
        "sambanova": "SambaNova",
        "cerebras": "Cerebras Systems",
        "etched": "Etched",
        "cognition": "Cognition AI",
        "cognition ai": "Cognition AI",
        "devin": "Cognition AI",
        "harvey": "Harvey AI",
        "harvey ai": "Harvey AI",
        "synthesia": "Synthesia",
        "elevenlabs": "ElevenLabs",
        "eleven labs": "ElevenLabs",
        "sora": "OpenAI",
        "claude": "Anthropic",
        "gemini": "Google DeepMind"
    }

    def __init__(self):
        self.mapping_logs: List[EntityMappingLog] = []

    def clean_string(self, raw_str: str) -> str:
        """Removes corporate suffixes (Inc., LLC, Corp, Ltd, PBC) and punctuation."""
        if not raw_str:
            return ""
        s = raw_str.strip()
        # Remove common legal entity suffixes
        pattern = r"\b(inc|incorporated|llc|corp|corporation|ltd|limited|pbc|gmbh|co)\b"
        s_clean = re.sub(pattern, "", s, flags=re.IGNORECASE)
        # Remove special characters except space
        s_clean = re.sub(r"[^\w\s]", "", s_clean)
        return re.sub(r"\s+", " ", s_clean).strip().lower()

    def resolve(self, raw_name: str) -> Tuple[str, EntityMappingLog]:
        """Resolves a raw entity string to its canonical name."""
        if not raw_name:
            canonical = "Unknown Entity"
            log = EntityMappingLog(rawName="", canonicalName=canonical, confidenceScore=0.0, algorithm="Fallback")
            return canonical, log

        normalized = self.clean_string(raw_name)

        # 1. Exact Seed Lookup
        if normalized in self.SEED_CANONICAL_ENTITIES:
            canonical = self.SEED_CANONICAL_ENTITIES[normalized]
            log = EntityMappingLog(
                rawName=raw_name,
                canonicalName=canonical,
                confidenceScore=1.0,
                algorithm="Deterministic Seed Exact"
            )
            self.mapping_logs.append(log)
            return canonical, log

        # 2. Substring & Token Match against seeds
        for seed_key, canonical_val in self.SEED_CANONICAL_ENTITIES.items():
            if seed_key in normalized or normalized in seed_key:
                log = EntityMappingLog(
                    rawName=raw_name,
                    canonicalName=canonical_val,
                    confidenceScore=0.88,
                    algorithm="Fuzzy Token Match"
                )
                self.mapping_logs.append(log)
                return canonical_val, log

        # 3. Capitalization fallback for unknown entities
        words = [w.capitalize() for w in raw_name.strip().split()]
        canonical = " ".join(words)
        # remove residual trailing commas
        canonical = re.sub(r",$", "", canonical)

        log = EntityMappingLog(
            rawName=raw_name,
            canonicalName=canonical,
            confidenceScore=0.75,
            algorithm="Normalized Capitalization"
        )
        self.mapping_logs.append(log)
        return canonical, log
