"""
Nexora Atlas / IntelliMesh - API & Entity Schemas
Defines Pydantic models for all API endpoints, entity structures, and provenance records.
"""

from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum


class PricingModelEnum(str, Enum):
    FREE = "FREE"
    FREEMIUM = "FREEMIUM"
    PAID = "PAID"
    ENTERPRISE = "ENTERPRISE"


# 1. Startup Schema
class StartupContentData(BaseModel):
    employeeCount: Optional[int] = Field(default=None, description="Employee count if available")

class StartupContent(BaseModel):
    entityName: str
    data: Optional[StartupContentData] = None

class SourceInfo(BaseModel):
    name: str
    url: str

class StartupModel(BaseModel):
    id: Optional[str] = None
    schemaVersion: str = "1.0"
    recordType: str = "STARTUP"
    source: SourceInfo
    content: StartupContent
    collectedAt: str


# 2. Product Schema
class ProductContent(BaseModel):
    productName: str
    startupName: str
    pricingModel: PricingModelEnum

class ProductModel(BaseModel):
    id: Optional[str] = None
    schemaVersion: str = "1.0"
    recordType: str = "PRODUCT"
    source: SourceInfo
    content: ProductContent
    collectedAt: str


# 3. Research Paper Schema
class ResearchPaperContent(BaseModel):
    title: str
    authors: List[str]
    paper_url: str
    github_url: Optional[str] = None
    github_stars: Optional[int] = None
    published_date: str

class ResearchPaperModel(BaseModel):
    id: Optional[str] = None
    schemaVersion: str = "1.0"
    recordType: str = "RESEARCH_PAPER"
    content: ResearchPaperContent
    collectedAt: str


# 4. Job Schema
class JobContent(BaseModel):
    company: str
    title: str
    date: str
    is_remote: bool = True
    role_family: str = "Engineering"
    source_url: Optional[str] = None

class JobModel(BaseModel):
    id: Optional[str] = None
    schemaVersion: str = "1.0"
    recordType: str = "JOB"
    content: JobContent
    freshnessStatus: str = "VALIDATED_FRESH_24H"
    collectedAt: str


# 5. News Schema
class NewsContent(BaseModel):
    title: str
    url: str
    full_text: Optional[str] = None
    published_date: str
    canonical_source: str

class NewsModel(BaseModel):
    id: Optional[str] = None
    schemaVersion: str = "1.0"
    recordType: str = "NEWS"
    source: SourceInfo
    content: NewsContent
    freshnessStatus: str = "VALIDATED_FRESH_24H"
    collectedAt: str


# 6. Entity Mapping Log Schema
class EntityMappingLogModel(BaseModel):
    id: Optional[str] = None
    rawName: str
    canonicalName: str
    entityType: str = "STARTUP"
    matchingMethod: str
    confidenceScore: float
    source: str
    timestamp: str


# Provenance Audit Trace Schema
class ProvenanceStep(BaseModel):
    stage: str
    timestamp: str
    detail: str
    status: str = "SUCCESS"

class DataProvenanceTrace(BaseModel):
    record_id: str
    entity_type: str
    source_url: str
    raw_content_preview: str
    extracted_text_preview: str
    chunks_count: int
    llm_provider_used: str
    schema_validated: bool
    canonical_entity_resolved: str
    final_db_timestamp: str
    steps: List[ProvenanceStep]
