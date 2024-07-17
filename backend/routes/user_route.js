import express from "express"

const router = express.Router()

router.get("/test", test)
router.put("/update/:userId", validateToken, updateUser)

export default router
