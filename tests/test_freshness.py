import pytest
from datetime import datetime, timedelta, timezone
from src.crawler import DateNormalizer

def test_relative_hours_ago():
    now = datetime.now(timezone.utc)
    parsed = DateNormalizer.parse_relative_or_iso("2 hours ago", now=now)
    assert parsed is not None
    assert DateNormalizer.is_within_24_hours(parsed, now=now) is True

def test_relative_days_ago_old():
    now = datetime.now(timezone.utc)
    parsed = DateNormalizer.parse_relative_or_iso("3 days ago", now=now)
    assert DateNormalizer.is_within_24_hours(parsed, now=now) is False

def test_iso_timestamp():
    now = datetime.now(timezone.utc)
    iso_str = (now - timedelta(hours=5)).isoformat()
    assert DateNormalizer.is_within_24_hours(iso_str, now=now) is True
