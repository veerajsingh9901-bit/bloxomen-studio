import asyncio
import edge_tts

TEXT = (
    "In 2016, a forgotten Roblox baseplate server stayed online with zero players. "
    "Until one night, a Guest account joined without a username. "
    "It didn't walk. It didn't jump. It just stood at the edge of the fog, staring directly at the spawn pad. "
    "When the game's creator checked the server logs the next morning, the chat had only one message: "
    "I can see your screen."
)

async def main():
    communicate = edge_tts.Communicate(TEXT, "en-US-ChristopherNeural", rate="-6%")
    await communicate.save("public/voice.mp3")

asyncio.run(main())
