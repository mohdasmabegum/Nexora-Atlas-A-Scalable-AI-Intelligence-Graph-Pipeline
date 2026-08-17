from src.llm_orchestrator import LLMFallbackChain

def test_chunking_small_payload():
    chain = LLMFallbackChain()
    small_text = "This is a small text well within token threshold."
    chunks = chain.chunk_payload(small_text, max_bytes=1000)
    assert len(chunks) == 1

def test_chunking_large_payload():
    chain = LLMFallbackChain()
    large_text = ("Paragraph content chunking test.\n\n" * 50)
    chunks = chain.chunk_payload(large_text, max_bytes=200)
    assert len(chunks) > 1
