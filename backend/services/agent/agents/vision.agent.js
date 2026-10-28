import axios from "axios"
import { getModel } from "../config/llmModels.js"
import { uploadToS3 } from "../utils/uploadToS3.js"
import { getFromS3 } from "../utils/getFromS3.js"
import { deductCredits } from "../utils/deductCredits.js"
import { checkAgentLimit } from "../config/agentLimit.js"

const POLLINATIONS_IMAGE_URL = "https://gen.pollinations.ai/image"

const readUpstreamError = (error) => {
  const data = error?.response?.data

  if (Buffer.isBuffer(data)) {
    try {
      const parsed = JSON.parse(data.toString("utf8"))
      return parsed?.error?.message || parsed?.message
    } catch {
      return null
    }
  }

  return data?.error?.message || data?.message || error?.message
}

export const visionAgent = async (state) => {
  try {
    await checkAgentLimit(state.userId, "image")

    if (!process.env.POLLINATIONS_API_KEY) {
      throw new Error("Image generation is not configured. Add POLLINATIONS_API_KEY to the agent service environment.")
    }

    const llm = await getModel("image")
    const response = await llm.invoke(`
You are an elite AI image prompt engineer.

Convert the user request into a highly detailed image generation prompt.

Requirements:
- Cinematic lighting
- Professional composition
- Ultra realistic
- High detail
- Beautiful color palette
- Sharp focus
- Photorealistic
- Depth of field

Return only the image prompt.

User Request:
${state.prompt}
`)

    const prompt = response.content.trim()
    const imageResponse = await axios.get(
      `${POLLINATIONS_IMAGE_URL}/${encodeURIComponent(prompt)}`,
      {
        responseType: "arraybuffer",
        timeout: 120000,
        params: { model: "flux", width: 1024, height: 1024 },
        headers: { Authorization: `Bearer ${process.env.POLLINATIONS_API_KEY}` }
      }
    )

    const contentType = imageResponse.headers["content-type"] || ""
    if (!contentType.startsWith("image/")) {
      throw new Error("The image provider returned an invalid response.")
    }

    const buffer = Buffer.from(imageResponse.data)
    const extension = contentType.includes("png") ? "png" : "jpg"
    const filename = `image-${Date.now()}.${extension}`

    await uploadToS3(filename, buffer, contentType)
    const downloadUrl = await getFromS3(filename, 10 * 60)

    // Charge only after generation and storage both succeed.
    await deductCredits(state.userId, "vision")

    return {
      ...state,
      aiResponse: `![Generated Image](${downloadUrl})\n\n[Download image](${downloadUrl})\n\n_Link expires in 10 minutes._`
    }
  } catch (error) {
    const message = readUpstreamError(error) || "Failed to generate image."
    console.error("Image generation failed:", message)

    return {
      ...state,
      aiResponse: message
    }
  }
}
