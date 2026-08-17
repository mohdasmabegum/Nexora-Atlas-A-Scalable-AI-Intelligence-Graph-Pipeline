from src.entity_resolver import EntityResolver

def test_exact_seed_resolution():
    resolver = EntityResolver()
    canonical, log = resolver.resolve("OpenAI, Inc.")
    assert canonical == "OpenAI"
    assert log.confidenceScore == 1.0

def test_fuzzy_token_resolution():
    resolver = EntityResolver()
    canonical, log = resolver.resolve("Anthropic PBC")
    assert canonical == "Anthropic"
    assert log.confidenceScore > 0.8
