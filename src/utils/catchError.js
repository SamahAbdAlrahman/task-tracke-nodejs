export const asyncHandler = (func) => {
    return async (req, res, next) => {
      try {
        await func(req, res, next);  // تنفيذ الوظيفة المرسلة (func)
      } catch (error) {
        return res.status(500).json({
            msg:"server error",
            error: error.stack
        })
      }
    }
  };
  