const { query } = require("../config/db");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");
const ai = require("../services/aiService");
const { emitToBoard, logActivity } = require("../realtime");

const generateTasks = asyncHandler(async (req, res) => {
  const goal = (req.body.goal || "").trim()

  if (!goal) throw ApiError.badRequest("Project goal is required");
  const count = Math.min(Math.max(parseInt(req.body.count, 10) || 6, 1), 15)

  const suggestions = await ai.generateTasks(goal, count)

  if(!req.body.column_id) {
    return res.json({ tasks: suggestions, persisted: false})
  }

  const colRes = await query("SELECT id FROM columns WHERE id = $1 and board_id = $2", [
    req.body.column_id, req.board.id
  ]);
  if(colRes.rows.length) throw new ApiError.badRequest("column_id does not belong to this board")

  
})
