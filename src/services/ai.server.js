const asyncHandler = require("../utils/asyncHandler");
const { callGeminiApi } = require("./gemini")

const analyzeTask = asyncHandler(async(req, res) => {

    const { prompt } = req.body;
    
})