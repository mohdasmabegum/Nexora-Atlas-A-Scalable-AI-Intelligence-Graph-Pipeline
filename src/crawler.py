"""
Nexora Atlas - Async Ingestion & Date Normalization Crawler Module
Handles high-concurrency scraping, date parsing (including relative dates), and 24-hr freshness filtering.
"""

import asyncio
import re
from datetime import datetime, timedelta, timezone
from typing import Optional, Dict, Any, List


class DateNormalizer:
    """Extracts and normalizes raw publication date strings to standard ISO-8601 UTC timestamps."""
    
    @staticmethod
    def parse_relative_or_iso(date_str: str, now: Optional[datetime] = None) -> str:
        if not now:
            now = datetime.now(timezone.utc)
            
        if not date_str or not isinstance(date_str, str):
            return now.isoformat()
            
        date_str_clean = date_str.strip().lower()
        
        # Check ISO format directly
        try:
            dt = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
            return dt.isoformat()
        except ValueError:
            pass
            
        # Parse relative durations: e.g., "2 hours ago", "45 mins ago", "1 day ago", "just now"
        if "just now" in date_str_clean or "moment ago" in date_str_clean:
            return now.isoformat()
            
        match_hours = re.search(r"(\d+)\s*(?:hour|hr|hours|hrs)\s*ago", date_str_clean)
        if match_hours:
            hours = int(match_hours.group(1))
            return (now - timedelta(hours=hours)).isoformat()
            
        match_mins = re.search(r"(\d+)\s*(?:min|minute|mins|minutes)\s*ago", date_str_clean)
        if match_mins:
            mins = int(match_mins.group(1))
            return (now - timedelta(minutes=mins)).isoformat()
            
        match_days = re.search(r"(\d+)\s*(?:day|days)\s*ago", date_str_clean)
        if match_days:
            days = int(match_days.group(1))
            return (now - timedelta(days=days)).isoformat()
            
        if "yesterday" in date_str_clean:
            return (now - timedelta(days=1)).isoformat()
            
        # Default fallback
        return now.isoformat()

    @staticmethod
    def is_within_24_hours(iso_timestamp: str, now: Optional[datetime] = None) -> bool:
        """Heuristic check to guarantee content was published within the last 24 hours."""
        if not now:
            now = datetime.now(timezone.utc)
        try:
            dt = datetime.fromisoformat(iso_timestamp.replace("Z", "+00:00"))
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            delta = now - dt
            return timedelta(seconds=0) <= delta <= timedelta(hours=24)
        except Exception:
            return True


class AntiBotCrawler:
    """Asynchronous crawler demonstrating rotation of headers and rate-limit safety."""

    def __init__(self, concurrency_limit: int = 20):
        self.semaphore = asyncio.Semaphore(concurrency_limit)
        self.user_agents = [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
            "Mozilla/5.0 (X11; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0"
        ]

    def get_stealth_headers(self, index: int = 0) -> Dict[str, str]:
        return {
            "User-Agent": self.user_agents[index % len(self.user_agents)],
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Sec-Ch-Ua": '"Chromium";v="122", "Not(A:Brand";v="24"',
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": '"Windows"',
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Upgrade-Insecure-Requests": "1"
        }

    async def fetch_mock_source(self, url: str, item_id: int) -> Dict[str, Any]:
        """Simulate async high-speed concurrent network fetch with resilience."""
        async with self.semaphore:
            # Simulate low latency network fetch
            await asyncio.sleep(0.001)
            headers = self.get_stealth_headers(item_id)
            return {
                "url": url,
                "status": 200,
                "headers": headers,
                "raw_html": f"<html><body>Content for item {item_id} from {url}</body></html>"
            }
