"""
Nexora Atlas - Entity Schemas
Defines canonical data structures for all ingested entities in the AI Intelligence Graph.
"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Optional
from enum import Enum


class PricingModel(str, Enum):
    FREE = "FREE"
    FREEMIUM = "FREEMIUM"
    PAID = "PAID"
    ENTERPRISE = "ENTERPRISE"


@dataclass
class StartupEntity:
    schemaVersion: str = "1.0"
    recordType: str = "STARTUP"
    source_name: str = ""
    source_url: str = ""
    entityName: str = ""
    employeeCount: Optional[int] = None
    collectedAt: str = field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")

    def to_dict(self):
        return {
            "schemaVersion": self.schemaVersion,
            "recordType": self.recordType,
            "source": {
                "name": self.source_name,
                "url": self.source_url
            },
            "content": {
                "entityName": self.entityName,
                "data": {
                    "employeeCount": self.employeeCount
                }
            },
            "collectedAt": self.collectedAt
        }


@dataclass
class ProductEntity:
    schemaVersion: str = "1.0"
    recordType: str = "PRODUCT"
    source_name: str = ""
    source_url: str = ""
    productName: str = ""
    startupName: str = ""
    pricingModel: PricingModel = PricingModel.FREEMIUM
    collectedAt: str = field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")

    def to_dict(self):
        return {
            "schemaVersion": self.schemaVersion,
            "recordType": self.recordType,
            "source": {
                "name": self.source_name,
                "url": self.source_url
            },
            "content": {
                "productName": self.productName,
                "startupName": self.startupName,
                "pricingModel": self.pricingModel.value if isinstance(self.pricingModel, PricingModel) else self.pricingModel
            },
            "collectedAt": self.collectedAt
        }


@dataclass
class ResearchPaperEntity:
    schemaVersion: str = "1.0"
    recordType: str = "RESEARCH_PAPER"
    title: str = ""
    authors: List[str] = field(default_factory=list)
    paper_url: str = ""
    github_url: Optional[str] = None
    github_stars: Optional[int] = None
    published_date: str = field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")
    collectedAt: str = field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")

    def to_dict(self):
        return {
            "schemaVersion": self.schemaVersion,
            "recordType": self.recordType,
            "content": {
                "title": self.title,
                "authors": self.authors,
                "paper_url": self.paper_url,
                "github_url": self.github_url,
                "github_stars": self.github_stars,
                "published_date": self.published_date
            },
            "collectedAt": self.collectedAt
        }


@dataclass
class JobEntity:
    schemaVersion: str = "1.0"
    recordType: str = "JOB"
    company: str = ""
    title: str = ""
    date: str = field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")
    is_remote: bool = True
    role_family: str = "Engineering"
    source_url: str = ""
    collectedAt: str = field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")

    def to_dict(self):
        return {
            "schemaVersion": self.schemaVersion,
            "recordType": self.recordType,
            "content": {
                "company": self.company,
                "title": self.title,
                "date": self.date,
                "is_remote": self.is_remote,
                "role_family": self.role_family,
                "source_url": self.source_url
            },
            "collectedAt": self.collectedAt
        }


@dataclass
class NewsEntity:
    schemaVersion: str = "1.0"
    recordType: str = "NEWS"
    headline: str = ""
    source: str = ""
    published_date: str = field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")
    summary: str = ""
    url: str = ""
    collectedAt: str = field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")

    def to_dict(self):
        return {
            "schemaVersion": self.schemaVersion,
            "recordType": self.recordType,
            "content": {
                "headline": self.headline,
                "source": self.source,
                "published_date": self.published_date,
                "summary": self.summary,
                "url": self.url
            },
            "collectedAt": self.collectedAt
        }


@dataclass
class EntityMappingLog:
    rawName: str = ""
    canonicalName: str = ""
    confidenceScore: float = 1.0
    algorithm: str = "Deterministic-Exact/Fuzzy"
    timestamp: str = field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")

    def to_dict(self):
        return {
            "rawName": self.rawName,
            "canonicalName": self.canonicalName,
            "confidenceScore": self.confidenceScore,
            "algorithm": self.algorithm,
            "timestamp": self.timestamp
        }
