# backend/app/gpt2_generator.py

from transformers import AutoModelForCausalLM, AutoTokenizer
import torch


tokenizer = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2")

def generate_text(prompt):
    inputs = tokenizer.encode(prompt, return_tensors='pt')

    outputs = model.generate(
        inputs,
        max_length=100,
        num_return_sequences=1,
        no_repeat_ngram_size=2,
        repetition_penalty=1.5,
        temperature=0.7,
        top_p=0.9,
    )

    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    processed_text = remove_repetitions(generated_text)
    return processed_text

def remove_repetitions(text):
    sentences = text.split(". ")
    seen_sentences = set()
    result = []
    
    for sentence in sentences:
        if sentence not in seen_sentences:
            result.append(sentence)
            seen_sentences.add(sentence)

    return ". ".join(result).strip()
