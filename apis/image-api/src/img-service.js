const openai = require('./openai')

// Additional prompt sets
const additionalPrompts = [
  ['anime80s', 'cute'],
  ['cinematic', 'illustration'],
  ['gold', 'cyberpunk']
]

async function generateImg (prompt) {
  try {
    // Randomly select an additional prompts set
    const additionalPromptSet = additionalPrompts[Math.floor(Math.random() * additionalPrompts.length)]
    // Add the main prompt and the additional prompts
    const prompts = [prompt, ...additionalPromptSet]

    const { data } = await openai.createImage({
      prompt: prompts.join('\n'),
      size: '512x512'
    })

    return data.data[0]
  } catch (error) {
    if (error.response) {
      console.log(error.response.status)
      console.log(error.response.data)
    } else {
      console.log(error.message)
    }

    throw new Error('Error generating image')
  }
}

module.exports = { generateImg }